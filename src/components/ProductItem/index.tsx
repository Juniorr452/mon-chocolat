import { Box, HStack, VStack, Text, Button, Icon, useToast } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCartPlus, FaCheck } from 'react-icons/fa';
import { add, remove } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MotionVStack, MotionBox } from '../../motion';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
  imageUrl: string;
}

const ProductItem: React.FC<ProductItemProps> = (product) => {
  const productInCart = useAppSelector(state => state.cart.products.hasOwnProperty(product.id))
  const available = product.availableQuantity > 0;
  const dispatch = useAppDispatch();
  const toast = useToast();

  function handleCartClick() {
    if(!available)
      return;

    if(!productInCart) {
      dispatch(add({...product}));
      toast({
        title: "Produit ajouté au panier",
        status: 'success',
      })
    } else {
      dispatch(remove(product.id))
      toast({
        title: "Produit retiré du panier",
        status: 'info'
      })
    }
  }

  return (
    <MotionVStack
      key={product.id}
      p="8"
      color="black"
      pos="relative"
      borderRadius="32px"
      shadow="lg"

      variants={{
        hidden: {
          opacity: 0,
          y: 50
        },
        show: {
          opacity: 1,
          y: 0,

          transition: {
            ease: 'circOut',
            duration: .7
          }
        }
      }}
    >
      <HStack w="100%">
        <Button
          p="2"
          ml="auto"
          bg="transparent"
          border="1px"
          borderColor={productInCart ? "green.500" : "blue.900"}
          borderRadius="100%"
          cursor="pointer"
          onClick={handleCartClick}
          data-testid="cartbutton"
          isDisabled={!available}
        >
          <AnimatePresence exitBeforeEnter>
            {productInCart 
              ? (
                <MotionBox
                  key="check"
                  color="green.500"
                  variants={{
                    hidden: { scale: 0 },
                    show: { 
                      scale: 1,
                      transition: {
                        ease: 'backOut'
                      }
                    }
                  }}
                  
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <Icon 
                    as={FaCheck} 
                    fontSize="md"
                  />
                </MotionBox>
              )
              : (
                <MotionBox
                  key="cart-plus"
                  color="blue.900"
                  
                  variants={{
                    hidden: { scale: 0 },
                    show: { scale: 1 }
                  }}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <Icon 
                    as={FaCartPlus} 
                    fontSize="md"
                  />
                </MotionBox>
              )
            }
           
          </AnimatePresence>
        </Button>
      </HStack>

      <Box w="100%" pos="relative">
        <Box w="110px" h="210px" bg="orange.300" mx="auto"></Box>

        <Box
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="200px"
          h="150px"
        >
          <Image 
            src={product.imageUrl}
            alt=""
            width={200} 
            height={150} 
            layout="responsive"
            objectFit="contain"
          />
        </Box>        
      </Box>
      

      <VStack spacing="0">
        <Text mt="8" fontSize="larger" fontWeight="bold" letterSpacing="3px">{product.name}</Text>
        <Text>{available ? `$${product.price}` : 'indisponible' }</Text>
      </VStack>
    </MotionVStack>
  )
}

export default ProductItem;