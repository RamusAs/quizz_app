import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  StackSeparator,
  Button,
} from "@chakra-ui/react"
import {
  decodeHtml,
  getUserProgress,
  resetUserProgress,
  userAnswers,
} from "../helpers"
import { GoCheckCircle } from "react-icons/go"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { Tag } from "./ui/tag"
import { useNavigate, useParams } from "react-router-dom"

export const Summary = ({ userAnswers }: { userAnswers: userAnswers[] }) => {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const userProgress = getUserProgress()
  const progress = userProgress[category as string]

  const handleRestart = () => {
    resetUserProgress(category as string)
    navigate(`/categories/${category}`)
  }

  return (
    <Box p={8} bg="gray.50" borderRadius="md" shadow="md">
      {/* En-tête */}
      <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.600">
        Summary of results
      </Heading>

      {/* Score global */}
      <Box
        textAlign="center"
        bg="teal.100"
        p={4}
        borderRadius="md"
        mb={8}
        shadow="sm"
      >
        <Heading as="h3" size="lg" color="teal.700">
          Score : {`${progress.correct} / ${progress.total}`}
        </Heading>
        <Text mt={2} color="teal.500">
          Congrat' for your efforts, keep it up! 🎉
        </Text>
        <Flex gap={5} my={5} justify={"center"}>
          <Button onClick={() => handleRestart()}>Restart</Button>{" "}
          <Button onClick={() => navigate(`/categories`)}>Back to home</Button>
        </Flex>
      </Box>

      {/* Liste des questions avec indicateurs visuels */}
      <Stack
        gap={4}
        align="stretch"
        separator={<StackSeparator borderColor="gray.200" />}
      >
        {userAnswers.map((result, index) => (
          <Flex
            key={index}
            p={4}
            bg={result.correct ? "green.50" : "red.50"}
            borderRadius="md"
            shadow="sm"
            align="center"
            justify="space-between"
          >
            {/* Question et réponse */}
            <Box>
              <Text fontSize="sm" color="gray.500">
                <strong>Question {index + 1} :</strong>{" "}
                {decodeHtml(result.question)}
              </Text>
              <Text mt={1}>
                <strong>Your answer :</strong>{" "}
                <Tag
                  endElement={
                    result.correct ? (
                      <GoCheckCircle />
                    ) : (
                      <IoIosCloseCircleOutline />
                    )
                  }
                  colorScheme={result.correct ? "green" : "red"}
                  variant="subtle"
                  size="md"
                >
                  {decodeHtml(result.answer)}
                </Tag>
              </Text>
            </Box>

            {/* Indicateur de résultat */}
            {result.correct ? (
              <GoCheckCircle
                size={6}
                color={result.correct ? "green.400" : "red.400"}
              />
            ) : (
              <IoIosCloseCircleOutline
                size={6}
                color={result.correct ? "green.400" : "red.400"}
              />
            )}
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}
