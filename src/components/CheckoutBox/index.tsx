import React from 'react';

import { Box, HStack, VStack, Text, Button } from '@chakra-ui/react'

interface Product {
  price: number;
  quantity: number;
}

interface CheckoutBoxProps {
  shipping: {
    name: string;
    price: number;
  };

  products: Product[];
  onCheckout?: (total: number) => void;
}

const CheckoutBox: React.FC<CheckoutBoxProps> = ({
  shipping,
  products,
  onCheckout = () => {}
}) => {
  const total = products.reduce((prev, product) => prev + (product.price * product.quantity), 0) + shipping.price;

  return (
    <Box
      w="100%"
      h="fit-content"
      maxW="300px"
      bg="gray.100" 
      p="6" 
      borderRadius="12"
      color="black"
    >
      <VStack 
        align="start" 
        spacing="2"
      >
        <Box>
          <Text fontWeight="bold">Livraison</Text>
          <Text>{shipping.name}</Text>
        </Box>

        <HStack justify="space-between">
          <Text>Prix</Text>
          <Text>{shipping.price > 0 ? `$${shipping.price}` : 'Gratuite'}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text>Sous-total</Text>
          <Text>{products.length > 0 ? `$${total.toFixed(2)}` : '--.--'}</Text>
        </HStack>
      </VStack>

      <Button 
        colorScheme="orange" 
        mt="8"
        isDisabled={products.length === 0}
        onClick={() => onCheckout(total)}
        type="submit"
      >
        Passer la comande
      </Button>
    </Box>
  )
}

export default CheckoutBox;