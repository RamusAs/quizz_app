import { Box, Flex, Text } from "@chakra-ui/react"
import { FaDice, FaMedal } from "react-icons/fa"
import { HiOutlinePuzzlePiece } from "react-icons/hi2"
import { useNavigate, useLocation } from "react-router-dom"

export const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      label: "Home",
      icon: HiOutlinePuzzlePiece,
      path: "/categories",
    },
    {
      label: "Games",
      icon: FaDice,
      path: "/games",
    },
    {
      label: "Rewards",
      icon: FaMedal,
      path: "/rewards",
    },
  ]

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg="white"
      borderTop="1px solid #E2E8F0"
      boxShadow="0px -1px 5px rgba(0, 0, 0, 0.1)"
      zIndex="10"
    >
      <Flex justify="space-around" align="center" py={3}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          const color = isActive ? "#6B46C1" : "#DFDCED"

          return (
            <Flex
              key={item.label}
              direction="column"
              align="center"
              onClick={() => navigate(item.path)}
              cursor="pointer"
              color={color}
            >
              <item.icon size={30} />
              <Text fontSize="sm" mt={1}>
                {item.label}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
