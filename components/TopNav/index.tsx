import Link from 'next/link'
import { Box, Container, HStack, Heading, Icon, Button} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

export default function TopNav() {
  return (
    <Box bg="gray.700" as="nav">
      <Container 
        maxW={{
          base: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl'
        }}
        py="4"
      >
        <HStack justify="space-between">
          <Heading
            fontSize="2xl"
          >
            mon chocolat
          </Heading>
          <Link href="/cart" passHref>
            <Button
              p="2"
              as="a"
              bg="transparent"
              _hover={{
                bg: "gray.500"
              }}
              borderRadius="100%"
            >
              <Icon as={FaShoppingCart} fontSize="xl"/>
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}