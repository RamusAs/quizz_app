import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Text } from "@chakra-ui/react"
import { Question, userAnswers, UserProgress } from "../helpers"
import { Questions, Summary } from "../components"
import { useParams } from "react-router-dom"
import {
  getCategory,
  getCategoryQuestions,
  getUserProgress,
} from "../services/firestoreService"

export const QuizPage: React.FC = () => {
  const { category: id } = useParams<{ category: string }>()
  const { data: category, isLoading: catLoading } = useQuery<any>({
    queryKey: ["category"],
    queryFn: () => getCategory(parseInt(id ?? "")),
  })

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>(
    {
      queryKey: ["user"],
      queryFn: () => getUserProgress(),
    }
  )
  const progressIndex =
    category && progress ? progress?.[category.uid]?.answeredCount : 0

  const { data: questions, isLoading: questionLoading, error } = useQuery<
    Question[] | any
  >({
    queryKey: ["questions"],
    queryFn: () => getCategoryQuestions(parseInt(id ?? "")),
  })

  const [currentIndex, setCurrentIndex] = useState<number>(progressIndex as number)
  const [userAnswers, setUserAnswers] = useState<userAnswers[]>([])

  const isLoading = questionLoading || catLoading || progressLoading

  if (isLoading) return <Text>Chargement des questions...</Text>
  if (error instanceof Error) return <Text>Erreur : {error.message}</Text>

  const isGameEnd = progressIndex !== category.question_counts

  return (
    <>
      {isGameEnd && (
        <Questions
          questions={questions as Question[]}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setUserAnswers={setUserAnswers}
          category={category.uid}
          progress={progress?.[category.uid]}
        />
      )}
      {!isGameEnd && <Summary userAnswers={userAnswers} />}
    </>
  )
}
