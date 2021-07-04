import { Box, HStack, VStack, Text, Icon, Button, useToast } from '@chakra-ui/react';
import { FaCartPlus, FaCheck } from 'react-icons/fa';
import { add, remove } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
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
    <VStack
      bg="gray.400"
      p="8"
      color="black"
      pos="relative"
      borderRadius="32px"
    >
      <HStack w="100%">
        <Button
          p="2"
          ml="auto"
          bg="transparent"
          border="1px"
          borderColor="gray.500"
          borderRadius="100%"
          cursor="pointer"
          onClick={handleCartClick}
          data-testid="cartbutton"
          isDisabled={!available}
        >
          <Icon as={productInCart ? FaCheck : FaCartPlus} fontSize="md"/>
        </Button>
      </HStack>

      <Box w="100px" h="200px" bg="gray.700"></Box>

      <VStack spacing="0">
        <Text mt="8" fontSize="larger" fontWeight="bold" letterSpacing="3px">{product.name}</Text>
        <Text>{available ? `$${product.price}` : 'indisponible' }</Text>
      </VStack>
    </VStack>
  )
}

export default ProductItem;