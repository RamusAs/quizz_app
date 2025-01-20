"use client"

import { FormControl } from "@chakra-ui/form-control"
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { SelectControl } from "../components/SelectControl"

// Global state management (using Context or a state management library like Zustand or Redux)
//import { useSettingsStore } from "../stores/settingsStore"

export const ParametersPage = () => {
  // const { setDifficulty, setType } = useSettingsStore()

  const [difficulty, setLocalDifficulty] = useState("any")
  console.log("🚀 ~ ParametersPage ~ difficulty:", difficulty)
  const [questionType, setLocalType] = useState("any")
  console.log("🚀 ~ ParametersPage ~ questionType:", questionType)

  const handleApplySettings = () => {
    //setDifficulty(difficulty)
    //setType(questionType)
    alert("Settings updated!")
  }

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <Stack py={24} px={6} m={8}>
        <Stack align="center">
          <Heading fontSize="4xl">Adjust Quiz Parameters</Heading>
          <Text fontSize="lg" color="gray.600">
            Customize your quiz experience 🎯
          </Text>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack p={6}>
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
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={handleApplySettings}
              >
                Apply Settings
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
