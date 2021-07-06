import { Box, BoxProps, Flex, FlexProps, SimpleGrid, SimpleGridProps, StackProps, Text, TextProps, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const MotionBox = motion<BoxProps>(Box)
export const MotionSimpleGrid = motion<SimpleGridProps>(SimpleGrid);
export const MotionVStack = motion<StackProps>(VStack);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionText = motion<TextProps>(Text);