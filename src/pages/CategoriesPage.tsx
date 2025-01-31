import { useQuery } from "@tanstack/react-query"
import {
  Category,
  getCatColor,
  sortByKey,
  UserProgress,
} from "../helpers"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../components/ui/progress-circle"
import { Box, Flex, Text } from "@chakra-ui/react"
import { CategorieImage } from "../components"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  getCategoriesWithQuestionCount,
  getProfile,
} from "../services/firestoreService"
import { PageLoader } from "../PageLoader"

export const CategoriesPage = () => {
  const { data: categories, isLoading } = useQuery<any>({
    queryKey: ["trivia_categories"],
    queryFn: () => getCategoriesWithQuestionCount(),
  })

  const { data: user, isLoading: userLoading } = useQuery<any>({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  })
  const loading = isLoading || userLoading

  const [userProgress, setUserProgress] = useState<UserProgress>({})

  const navigate = useNavigate()

  useEffect(() => {
    setUserProgress(user?.progress)
  }, [user])

  return (
    <>
      <PageLoader isLoading={loading} />
      {!loading && (
        <Box minHeight="100vh" p={5}>
          <Text as={"h1"} textStyle="" p={2}>
            Hello, {user?.name}!
          </Text>
          <Text as={"h2"} textStyle="3xl" py={5} px={2}>
            <strong>What would you like to play today?</strong>
          </Text>

          <Box className="categories">
            {sortByKey(categories as Category[], "name").map((category) => {
              const progress = userProgress?.[category.uid]

              return (
                !!category.question_count && (
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
                    onClick={() => navigate(`${category.id}`)}
                  >
                    <CategorieImage category={category.name} />

                    <Box>
                      <Text as="h3" w={"full"} color={"#46557B"}>
                        <strong>{category.name}</strong>
                      </Text>
                      <Text color={"#C6C1E0"}>
                        {category.question_count} Questions
                      </Text>
                    </Box>

                    <ProgressCircleRoot
                      value={
                        ((progress?.answeredCount ?? 0) /
                          category.question_count) *
                        100
                      }
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
              )
            })}
          </Box>
        </Box>
      )}
    </>
  )
}
