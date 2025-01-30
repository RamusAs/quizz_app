import React, { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Text } from "@chakra-ui/react"
import { Question, UserProgress } from "../helpers"
import { Questions } from "../components"
import { Navigate, useParams } from "react-router-dom"
import {
  getCategory,
  getCategoryQuestions,
  getUserProgress,
} from "../services/firestoreService"
//import { useSettings } from "./ParametersPage"
import { PageLoader } from "../PageLoader"

export const QuizPage: React.FC = () => {
  const { category: id } = useParams<{ category: string }>()
  const { data: category, isLoading: catLoading } = useQuery<any>({
    queryKey: ["category"],
    queryFn: () => getCategory(parseInt(id ?? "")),
  })
  // const { type, difficulty } = useSettings() as Settings

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>(
    {
      queryKey: ["user"],
      queryFn: () => getUserProgress(),
    }
  )

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const progressIndex = useMemo(() => {
    const index = progress?.[category.uid]?.answeredCount ?? 0
    setCurrentIndex(index)
    return index
  }, [progress, category])

  const { data: questions, isLoading: questionLoading, error } = useQuery<
    Question[] | any
  >({
    queryKey: ["questions"],
    queryFn: () =>
      getCategoryQuestions(
        parseInt(
          id ?? ""
        ) /* {
        type,
        difficulty,
        setDifficulty: (value: string): void => {
          throw new Error(`"Function not implemented." ${value}`)
        },
        setType: (value: string): void => {
          throw new Error(`"Function not implemented." ${value}`)
        },
      } */
      ),
  })


  const isLoading = questionLoading || catLoading || progressLoading

  if (isLoading) return <PageLoader />
  if (error instanceof Error) return <Text>Erreur : {error.message}</Text>

  const isGameEnd = currentIndex >= questions.length

  return (
    <>
      {!isGameEnd && (
        <Questions
          questions={questions as Question[]}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          category={category.uid}
          progress={progress?.[category.uid]}
        />
      )}
      {isGameEnd && <Navigate to="/quiz" replace />}
    </>
  )
}
