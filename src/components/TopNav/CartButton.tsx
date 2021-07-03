import Link from 'next/link'
import { Box, Flex, Container, HStack, Heading, Icon, Button} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../../hooks';

const CartButton: React.FC = () => {
  const productsInCartQuantity = useAppSelector(state => (
    Object.values(state.cart.products).reduce((prev, product) => prev + product.quantity, 0)
  ));

  return (
    <Link href="/cart" passHref>
      <Button
        p="4"
        as="a"
        pos="relative"
        variant="ghost"
        colorScheme="whiteAlpha"
        
      >
        <Icon color="gray.300" as={FaShoppingCart} fontSize="2xl"/>

        {productsInCartQuantity > 0 && (
          <Flex
            pos="absolute"
            bottom="2px"
            right="4px"
            
            w="20px"
            h="20px"
            bg="pink.500"
            borderRadius="full"
            
            justify="center"
            align="center"
            
            color="white"
            fontFamily="Roboto"
            fontWeight="medium"
            textAlign="center"
            fontSize={productsInCartQuantity < 10 ? "smaller" : "x-small"}
            flexDirection="column"
          >
            {
              productsInCartQuantity < 10
                ? productsInCartQuantity
                : "9+"
            }
          </Flex>
        )}
      </Button>
    </Link>
  )
}

export default CartButton;