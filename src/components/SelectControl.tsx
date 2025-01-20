"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select"

export const SelectControl = ({
  options,
  label,
  onChange,
  placeholder,
}: {
  options?: any[]
  label?: any
  placeholder?: string
  onChange: Function
}) => {
  const frameworks = createListCollection({
    items: options ?? [],
  })
  return (
    <SelectRoot
      onValueChange={({ value }) => onChange(value)}
      collection={frameworks}
      size="sm"
      width="320px"
    >
      <SelectLabel>{label}</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
