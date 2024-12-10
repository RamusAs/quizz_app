import React from "react"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

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
        <Flex
          direction="column"
          align="center"
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          my={10}
        >
          <Heading as="h1" size="3xl" mb={4} px={6}>
            Welcome to <strong>FUN Quizz</strong> academy !
          </Heading>
          <Text mb={4}>Play, Learn and Explore with Exciting Quizzes.</Text>

          <Button
            color="black"
            bgColor="white"
            borderRadius="full"
            size="lg"
            onClick={() => navigate("/categories")}
          >
            Get Started
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
