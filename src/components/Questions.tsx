import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react"

import {
  decodeHtml,
  Question,
  updateUserProgress,
  userAnswers,
} from "../helpers"
import { useMemo, useState } from "react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "./ui/progress"
import { HiOutlineArrowLongRight, HiOutlinePuzzlePiece } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

interface QuestionsProps {
  questions: Question[] | undefined
  currentIndex: number
  setUserAnswers: Function
  setCurrentIndex: Function
  category: string | undefined
  amount: number
}

export const Questions = ({
  questions,
  currentIndex,
  setUserAnswers,
  setCurrentIndex,
  category,
  amount,
}: QuestionsProps) => {
  const navigate = useNavigate()
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const currentQuestion = questions?.[currentIndex]

  const multiplesQuestions = useMemo<string[]>(
    () =>
      currentQuestion?.incorrect_answers
        .concat(currentQuestion.correct_answer)
        .sort(() => Math.random() - 0.5) ?? [],
    [currentQuestion]
  )

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return
    setCurrentAnswer(answer)
    const isCorrect = answer === currentQuestion.correct_answer
    setUserAnswers((prev: userAnswers[]) => [
      ...prev,
      {
        question: currentQuestion.question,
        answer,
        correct: isCorrect,
      },
    ])
    setShowAnswer(true)
  }

  const handleNextQuestion = () => {
    setCurrentAnswer("")
    setShowAnswer(false)
    if (currentIndex < questions!.length) {
      setCurrentIndex((prev: number) => prev + 1)
    }
    updateUserProgress(`${category}`, currentIndex + 1, amount, currentAnswer === currentQuestion?.correct_answer )
  }

  const getColor = (answer: string, defaultColor: string = "white") => {
    if (!currentAnswer) return defaultColor // Couleur par défaut si rien n'est sélectionné

    if (answer === currentQuestion?.correct_answer) return "green" // Vert, que ce soit sélectionné ou pas

    if (answer === currentAnswer) return "orange.500" // Si c'est la réponse sélectionnée mais incorrecte

    return defaultColor
  }

  return (
    <Box
      bgImage="linear-gradient(0deg, #1a1537 60%, #2B2357 100%)"
      minHeight="100vh"
      color="white"
      textAlign="center"
      p={10}
      pb="40px"
    >
      {questions?.length === 0 && (
        <Button onClick={() => navigate("")}>Reload </Button>
      )}
      {!!questions?.length && (
        <>
          <Heading as="h2">
            <ProgressRoot
              value={(currentIndex + 1) * (100 / amount)}
              maxW="xl"
              variant="subtle"
              borderRadius="full"
              colorPalette="orange"
            >
              <HStack gap="5">
                <ProgressLabel>Question</ProgressLabel>
                <ProgressBar flex="1" borderRadius="5px" />
                <ProgressValueText
                  bgColor="orange.500"
                  px={3}
                  py={2}
                  borderRadius="md"
                  display="flex"
                  gap="2"
                >
                  <HiOutlinePuzzlePiece />
                  {currentIndex + 1} of {amount}
                </ProgressValueText>
              </HStack>
            </ProgressRoot>
          </Heading>

          <Box
            py={8}
            px={5}
            my={5}
            borderRadius="30px"
            bgColor="blue.900"
            textAlign="center"
          >
            <Heading as="h2" display="flex" gap={3} textAlign="center">
              Question <Text color="orange.500">{currentIndex + 1}</Text>
            </Heading>
            <Text color="gray" mt={5}>
              {decodeHtml(currentQuestion?.category)}
            </Text>
            <Separator mt={2} color="gray" />
            <Heading as="h3" my={4}>
              {decodeHtml(currentQuestion?.question)}
            </Heading>
          </Box>
          <Flex direction="column">
            {multiplesQuestions?.map((answer, idx) => (
              <Button
                bgColor="#14102d"
                borderWidth="1px"
                borderColor={getColor(answer)}
                color={getColor(answer)}
                rounded="md"
                key={idx}
                onClick={() => handleAnswer(answer)}
                m={3}
                flex={1}
                display="flex"
                justifyContent="space-between"
                p={3}
                disabled={!!currentAnswer}
              >
                <Text textWrap={"wrap"} textAlign={"left"}>
                  {decodeHtml(answer)}
                </Text>
                <Box
                  rounded="full"
                  border="solid 1px gray"
                  w={7}
                  h={7}
                  p="auto"
                  bgColor={getColor(answer, "transparent")}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {getColor(answer) === "white"
                    ? ""
                    : getColor(answer) === "green"
                    ? "✔"
                    : "✖"}
                </Box>
              </Button>
            ))}
          </Flex>
          {showAnswer && (
            <Button
              mt={4}
              onClick={handleNextQuestion}
              bgColor="white"
              color="black"
              borderRadius="full"
              w="100%"
            >
              Next question
              <HiOutlineArrowLongRight />
            </Button>
          )}
        </>
      )}
    </Box>
  )
}
