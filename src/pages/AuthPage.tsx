"use client"

import { useState } from "react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Box, Flex, Input, Stack, Heading, Text } from "@chakra-ui/react"
import { Alert } from "../components/ui/alert"
import { loginUser, registerUser } from "../services/authServices"
import { useNavigate } from "react-router-dom"
import { UserData } from "../helpers"
import { Button } from "../components/ui/button"

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
    name: "", // Utilisé uniquement pour le signup
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (isLogin) {
      // Connexion
      try {
        await loginUser(formData)
        setSuccess("Connexion réussie !")
        navigate("/quiz") // Redirection vers la home page
      } catch (err) {
        setError(
          (err instanceof Error && err.message) || "Une erreur est survenue."
        )
      } finally {
        setIsLoading(false)
      }
    } else {
      // Inscription + connexion automatique
      try {
        await registerUser(formData)
        setSuccess("Inscription réussie !")
        await loginUser(formData) // Connexion automatique
        navigate("/") // Redirection vers la home page
      } catch (err) {
        setError(
          (err instanceof Error && err.message) || "Une erreur est survenue."
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Box
      bgGradient="to-t"
      gradientFrom="#2B2357"
      gradientTo="#7F5CB2"
      minHeight="100vh"
      color="white"
    >
      <Box
        bgSize="contain"
        bgRepeat="no-repeat"
        bgImage="url(assets/home_bg.png)"
        minHeight="100vh"
        py={10}
        px={6}
      >
        <Stack mx="auto" maxW="lg" py={12} px={6}>
          <Box
            p={8}
            m={4}
            maxW="lg"
            w="full"
            bg="white"
            boxShadow="lg"
            rounded="lg"
          >
            <Stack align="center" textAlign="center">
              <Heading color="black" fontSize="4xl" mb={2}>
                {isLogin ? "Login" : "Sign up"}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Welcome to our quiz platform! 🎉
              </Text>
            </Stack>
            {error && <Alert status="error" title={error} />}
            {success && <Alert status="success" title={success} />}
            {!isLogin && (
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
            )}
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Stack p={10}>
              <Button
                bg="#6B46C1"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={handleSubmit}
                loading={isLoading}
              >
                {isLogin ? "Login" : "Sign up"}
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
