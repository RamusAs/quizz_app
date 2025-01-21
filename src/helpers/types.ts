export interface userAnswers {
  question: string
  answer: string
  correct: boolean
}

export interface Question {
  id: any
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface Category {
  id?: number
  uid: string
  name?: string
  question_counts?: number
}

export type UserProgress = Record<string, Progress>

export type Progress = {
  answeredCount?: number
  remainingQuestions?: any[]
  correctCount?: number
  completed?: number
  lastAnswered?: string | null
  total?: number
}

export interface UserData {
  id?: string
  name: string | undefined
  email: string
  password: string
}

export interface Settings {
  difficulty: "any" | "easy" | "medium" | "hard"
  type: "any" | "multiple" | "boolean"
  setDifficulty: (value: string) => void
  setType: (value: string) => void
}
