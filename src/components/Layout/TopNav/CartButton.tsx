import Link from 'next/link'
import { Flex, Icon, Button} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import { MotionFlex } from '../../../motion';

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
        data-testid="cart-link"
      >
        <Icon color="gray.300" as={FaShoppingCart} fontSize="2xl"/>

        <AnimatePresence initial={false}>
          {productsInCartQuantity > 0 && (
            <MotionFlex
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

              variants={{
                hidden: { scale: 0 },
                show: {
                  scale: 1,
                  transition: {
                    ease: 'backOut'
                  },
                }
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {
                productsInCartQuantity < 10
                  ? productsInCartQuantity
                  : "9+"
              }
            </MotionFlex>
          )}
        </AnimatePresence>
      </Button>
    </Link>
  )
}

export default CartButton;