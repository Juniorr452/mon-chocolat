import { Box, BoxProps, SimpleGrid, SimpleGridProps, StackProps, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const MotionBox = motion<BoxProps>(Box)
export const MotionSimpleGrid = motion<SimpleGridProps>(SimpleGrid);
export const MotionVStack = motion<StackProps>(VStack);