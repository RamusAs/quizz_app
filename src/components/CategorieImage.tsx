import { Image } from "@chakra-ui/react"
import { getCatColor } from "../helpers"

export const CategorieImage = ({ category }: { category: string }) => {
  switch (category.split(" ")?.[0].replace(":", "")) {
    case "Science":
      return (
        <Image
          src="assets/science.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg={getCatColor(category)}
          textAlign="left"
        />
      )
    case "Animals":
      return (
        <Image
          src="assets/animal.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg="green.500"
          textAlign="left"
        />
      )
    case "Entertainment":
      return (
        <Image
          src="assets/entertainment.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg={getCatColor(category)}
          textAlign="left"
        />
      )
    case "Sports":
      return (
        <Image
          src="assets/sport.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg={getCatColor(category)}
          textAlign="left"
        />
      )
    case "General":
      return (
        <Image
          src="assets/globe.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg={getCatColor(category)}
          textAlign="left"
        />
      )
    default:
      return (
        <Image
          src="assets/other.png"
          fit="cover"
          alt={category}
          boxSize="50px"
          borderRadius="full"
          bg={getCatColor(category)}
          textAlign="left"
        />
      )
  }
}
