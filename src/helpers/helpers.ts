import { UserProgress } from "./types"
const PROGRESS_KEY = "quizProgress"

// Fonction utilitaire pour nettoyer les entités HTML
export const decodeHtml = (input: string = ""): string => {
  const textArea = document.createElement("textarea")
  textArea.innerHTML = input
  return textArea.value
}

export const getUserProgress = (): UserProgress => {
  const progress = localStorage.getItem(PROGRESS_KEY)
  return progress ? JSON.parse(progress) : {}
}

export const updateUserProgress = (
  category: string,
  completed: number,
  total: number,
  correct: boolean
): void => {
  const progress = getUserProgress()
  progress[category] = {
    completed,
    total,
    correctCount: correct
      ? (progress[category]?.correctCount ?? 0) + 1
      : progress[category]?.correctCount ?? 0,
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export const resetUserProgress = (category: string): void => {
  const progress = getUserProgress()
  progress[category] = {
    completed: 0,
    total: 20,
    correctCount: 0,
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export const getCatColor = (cat: string) => {
  switch (cat.split(" ")?.[0].replace(":", "")) {
    case "Animals":
      return "green.500"
    case "Science":
      return "blue.500"
    case "Sports":
      return "purple.500"
    case "Entertainment":
      return "orange.500"
    case "General":
      return "pink.500"
    default:
      return "red.500"
  }
}

export const sortByKey = (arr: any[], key: string) =>
  arr?.sort((a, b) => a[key].localeCompare(b[key])) ?? []
