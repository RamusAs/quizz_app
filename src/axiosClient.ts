import axios from "axios"

const axiosClient = axios.create({
  baseURL: "https://localhost:5000/api/users", // Changez l'URL selon votre API
  headers: { "Content-Type": "application/json" },
})

export default axiosClient
