import { FaTimes } from 'react-icons/fa'
import { Image, Box, Flex, Container, HStack, VStack, Heading, Text, Icon, Button, SimpleGrid, Select, Stack } from '@chakra-ui/react'

export default function CartItem() {
  return (
    <Box pos="relative" bg="gray.100" px="8" py="4" w="100%" color="black">
      <Stack 
        direction={{
          base: "column",
          lg: "row"
        }}
        justify="space-between"
        spacing="8"
      >
        <Image
          src="https://via.placeholder.com/100"
          alt=""
          mx="auto"
          w={{
            base: "200px",
            lg: "120px",
            xl: "150px"
          }}
        />

        <Flex direction="column" align="left" flex="1" p="2">
          <Text 
            as="h2"
            fontSize="2xl"
            textAlign={{
              base: "center",
              lg: "left"
            }}
          >
            Un chocolat
          </Text>

          <Flex
            justify="space-between"
            w="100%"
            maxW="300px"
            mx={{
              base: "auto",
              lg: "0"
            }}
            mt="6"
          >
            <Box>
              <Text fontWeight="bold">Cada</Text>
              <Text>$59.99</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Quantidade</Text>
              <Text>$59.99</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Total</Text>
              <Text>$59.99</Text>
            </Box>
          </Flex>
        </Flex>


        <Button 
          pos={{
            base: "absolute",
            lg: "static"
          }}
          top="0"
          right="8"
          my={{
            base: "auto",
            lg: "auto"
          }}
          borderRadius="full"
        >
          <Icon as={FaTimes}></Icon>
        </Button>
      </Stack>
    </Box>
  )
}