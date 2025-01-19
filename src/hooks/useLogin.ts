import { useMutation } from "@tanstack/react-query"
import axiosClient from "../axiosClient"

export const useLogin = () => {
  return useMutation(async (credentials) => {
    // Appel à l'API de connexion
    const response = await axiosClient.post("/login", credentials)
    return response.data // Renvoie le token et les infos utilisateur
  })
}
