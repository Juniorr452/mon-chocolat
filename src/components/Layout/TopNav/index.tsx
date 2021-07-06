import Image from 'next/image'
import { Box, Container, HStack, Heading, Link} from '@chakra-ui/react';
import CartButton from './CartButton';
import NoScrollLink from '../../NoScrollLink';

import logo from '../../../public/logo-text.svg';

export default function TopNav() {
  return (
    <Box bg="gray.900" as="nav" w="100%">
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
            <NoScrollLink href="/">
              <Link data-testid="home-link" d="flex" justifyContent="center">
                <Image src={logo} alt="" width="185" height="40"/>
              </Link>
            </NoScrollLink>
          </Heading>
          <CartButton />
        </HStack>
      </Container>
    </Box>
  )
}