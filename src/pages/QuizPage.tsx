import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Text } from "@chakra-ui/react"
import { fetchQuestions } from "../api/api"
import { getUserProgress, Question, userAnswers } from "../helpers"
import { Questions, Summary } from "../components"
import { useParams } from "react-router-dom"

const NB_Q = 20

export const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const progress = getUserProgress()
  const progressIndex =
    category && progress?.[category]?.completed
      ? progress?.[category]?.completed
      : 0

  const { data: questions, isLoading, error } = useQuery<Question[]>({
    queryKey: ["questions", NB_Q],
    queryFn: () => fetchQuestions(NB_Q, category),
  })

  const [currentIndex, setCurrentIndex] = useState<number>(progressIndex)
  const [userAnswers, setUserAnswers] = useState<userAnswers[]>([])

  if (isLoading) return <Text>Chargement des questions...</Text>
  if (error instanceof Error) return <Text>Erreur : {error.message}</Text>

  const isGameEnd =
    (progress?.[category as string]?.completed ?? 0) !==
    (progress?.[category as string]?.total ?? 20)

  return (
    <>
      {isGameEnd && (
        <Questions
          questions={questions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setUserAnswers={setUserAnswers}
          category={category}
          amount={NB_Q}
        />
      )}
      {!isGameEnd && <Summary userAnswers={userAnswers} />}
    </>
  )
}
