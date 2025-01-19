"use client"

import { useState } from "react"
import {
  Flex,
  Box,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Toaster, toaster } from "../components/ui/toaster"
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signOut,
  User,
} from "firebase/auth"
import { auth } from "../firebase"

export const AccountPage = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      if (user) {
        // Update display name
        if (formData.name && formData.name !== user.displayName) {
          await updateProfile(user, { displayName: formData.name })
        }

        // Update email
        if (formData.email && formData.email !== user.email) {
          await updateEmail(user, formData.email)
        }

        // Update password
        if (formData.password) {
          await updatePassword(user, formData.password)
        }

        // Refresh the user object
        setUser(auth.currentUser)
        toaster.create({
          title: "Profile updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toaster.create({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toaster.create({
        title: "Logged out successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setUser(null)
    } catch (error) {
      toaster.create({
        title: "Error logging out",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <Box
        p={8}
        m={4}
        maxW="lg"
        w="full"
        bg="white"
        boxShadow="lg"
        rounded="lg"
      >
        <Stack spacing={4}>
          <Heading textAlign="center">Account Settings</Heading>
          <FormControl>
            <FormLabel>Pseudo</FormLabel>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Leave blank to keep current password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Stack spacing={6} pt={4}>
            <Button
              bgColor="#6B46C1"
              isLoading={isLoading}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
            <Button
              bgColor="red"
              color="white"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Toaster />
    </Flex>
  )
}
