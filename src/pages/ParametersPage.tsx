"use client"

import { FormControl } from "@chakra-ui/form-control"
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { SelectControl } from "../components/SelectControl"
import { useState, createContext, useContext } from "react"
import { Settings } from "../helpers"

// Context for global state
const SettingsContext = createContext({})

export const SettingsProvider = ({ children }: { children: any }) => {
  const [settings, setSettings] = useState({
    difficulty: "any",
    type: "any",
  })

  const setDifficulty = (difficulty: string) => {
    setSettings((prev) => ({ ...prev, difficulty }))
  }

  const setType = (type: string) => {
    setSettings((prev) => ({ ...prev, type }))
  }

  return (
    <SettingsContext.Provider value={{ ...settings, setDifficulty, setType }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)

export const ParametersPage = () => {
  const { difficulty, type, setDifficulty, setType } = useSettings() as Settings

  const [localDifficulty, setLocalDifficulty] = useState(difficulty)
  const [localType, setLocalType] = useState(type)

  const handleApplySettings = () => {
    setDifficulty(localDifficulty)
    setType(localType)
    alert("Settings updated!")
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
        <Stack align="center" mb={8}>
          <Heading textAlign="center" fontSize="2xl">
            Adjust Quiz Parameters
          </Heading>
          <Text textAlign="center" fontSize="lg" color="gray.600">
            Customize your quiz experience 🎯
          </Text>
        </Stack>
        <Stack>
          <FormControl>
            <SelectControl
              options={[
                { label: "any difficulty", value: "any" },
                { label: "Easy", value: "easy" },
                { label: "Medium", value: "medium" },
                { label: "Hard", value: "hard" },
              ]}
              label={"Difficulty"}
              placeholder="Select difficulty"
              onChange={setLocalDifficulty}
            />
          </FormControl>

          <FormControl>
            <SelectControl
              options={[
                { label: "any type", value: "any" },
                { label: "Multiple choice", value: "multiple" },
                { label: "True or False", value: "boolean" },
              ]}
              label={"Question Type"}
              placeholder="Select questions type"
              onChange={setLocalType}
            />
          </FormControl>

          <Stack pt={4}>
            <Button
              bg="#6B46C1"
              color="white"
              _hover={{ bg: "blue.500" }}
              onClick={handleApplySettings}
            >
              Apply Settings
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}
