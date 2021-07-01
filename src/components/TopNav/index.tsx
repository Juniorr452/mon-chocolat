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
            <Link href="/">
              <a>mon chocolat</a>
            </Link>
          </Heading>
          <Link href="/cart" passHref>
            <Button
              p="2"
              as="a"
              colorScheme="whiteAlpha"
              variant="outline"
              borderRadius="100%"
            >
              <Icon color="gray.300" as={FaShoppingCart} fontSize="xl"/>
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}