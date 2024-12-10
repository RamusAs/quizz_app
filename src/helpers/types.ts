export interface userAnswers {
  question: string
  answer: string
  correct: boolean
}

export interface Question {
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
