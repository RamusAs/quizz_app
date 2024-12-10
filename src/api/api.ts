import { Category, Question } from "../helpers"

export const fetchQuestions = async (
  amount: number = 10,
  category: string = "",
  difficulty: string = "",
  type: string = "multiple"
): Promise<Question[]> => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  const response = await fetch(url)
  const data = await response.json()

  // On retourne uniquement les résultats
  return (data?.results || []) as Question[]
}

export const fetchCategories = async (): Promise<Category[]> => {
  const url = `https://opentdb.com/api_category.php`
  const response = await fetch(url)
  const data = await response.json()

  // On retourne uniquement les résultats
  return data.trivia_categories as Category[]
}

export const fetchToken = async (): Promise<string> => {
  const url = `https://opentdb.com/api_token.php?command=request`
  const response = await fetch(url)
  const data = await response.json()

  // On retourne uniquement les résultats
  return data.results
}
