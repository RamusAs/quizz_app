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
  id: number
  name: string
}

export type UserProgress = {
  [category: string]: { total: number; completed: number; correct: number }
}

export interface UserData {
  name: string | undefined
  email: string
  password: string
}
