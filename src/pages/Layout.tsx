import { Outlet } from "react-router-dom"
import { BottomNavigation } from "../components"
import { Box } from "@chakra-ui/react"

export const Layout = () => {
  return (
    <>
      <Box pb={"80px"} minH={"100vh"}>
        <Outlet />
      </Box>
      <BottomNavigation />
    </>
  )
}
