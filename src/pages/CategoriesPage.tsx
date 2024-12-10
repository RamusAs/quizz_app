import { fetchCategories } from "../api/api"
import { useQuery } from "@tanstack/react-query"
import { Category, getCatColor, getUserProgress } from "../helpers"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../components/ui/progress-circle"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { BottomNavigation, CategorieImage } from "../components"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

type CategoryProgress = {
  name: string
  completed: number
  total: number
}

export const CategoriesPage = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["trivia_categories"],
    queryFn: () => fetchCategories(),
  })

  const [userProgress, setUserProgress] = useState<
    Record<string, { completed: number; total: number }>
  >({})

  const navigate = useNavigate()

  useEffect(() => {
    // Charger la progression utilisateur depuis LocalStorage
    const progress = getUserProgress()
    setUserProgress(progress)
  }, [])

  return (
    <>
      {" "}
      <Box minHeight="100vh" p={5}>
        <Text as={"h1"} textStyle="" p={2}>
          Hello, Moss!
        </Text>
        <Text as={"h2"} textStyle="3xl" py={5} px={2}>
          <strong>What would you like to play today?</strong>
        </Text>

        <Box className="categories">
          {categories?.map((category) => {
            const progress = userProgress[category.id] || {
              completed: 0,
              total: 20,
            }

            return (
              <Flex
                key={category.name}
                className="category"
                px={4}
                py={7}
                m={2}
                borderRadius="10px"
                justify="space-between"
                align="center"
                border="solid 1px #F2F0F8"
                gap={5}
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                <CategorieImage category={category.name} />

                <Box>
                  <Text as="h3" w={"full"} color={"#46557B"}>
                    <strong>{category.name}</strong>
                  </Text>
                  <Text color={"#C6C1E0"}>{progress.total} Questions</Text>
                </Box>

                <ProgressCircleRoot
                  value={(progress.completed / progress.total) * 100}
                  size="md"
                  color={getCatColor(category.name)}
                >
                  <ProgressCircleValueText />
                  <ProgressCircleRing
                    color={getCatColor(category.name)}
                    cap="round"
                    css={{ "--thickness": "3px" }}
                  />
                </ProgressCircleRoot>
              </Flex>
            )
          })}
        </Box>
      </Box>
    </>
  )
}
