import { useMutation } from "@tanstack/react-query"
import axiosClient from "../axiosClient"
import { UserData } from "../helpers"

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: UserData) => {
      console.log(userData)

      // Appel à l'API d'inscription
      const { data } = await axiosClient.post("/register", userData)
      return data // Renvoie les données utiles (ex. : message, user)
    },
  })
}
