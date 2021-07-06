import { ChangeEvent } from 'react';
import { FaTimes } from 'react-icons/fa'
import { Image, Box, Flex, Text, Icon, Button, Stack, Select } from '@chakra-ui/react'
import { useAppDispatch } from '../../hooks'
import { changeQuantity, remove } from '../../features/cart/cartSlice';
import { MotionBox } from '../../motion';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  i?: number;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  availableQuantity,
  i = 0
}: CartItemProps) {
  const dispatch = useAppDispatch();

  function handleQuantityChange(e: ChangeEvent<HTMLSelectElement>) {
    const qtd = Number(e.target.value);

    dispatch(changeQuantity({
      id,
      quantity: qtd
    }));
  }

  function handleRemove() {
    dispatch(remove(id));
  }

  return (
    <MotionBox 
      key={id}
      pos="relative" 
      bg="gray.100" 
      px="8" 
      py="4" 
      w="100%" 
      borderRadius="12" 
      color="black"
      shadow="md"

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
            duration: .5,
            delay: 0.1 * i
          }
        },
        exit: {
          opacity: 0,
          x: -100,
          transition: {
            ease: 'easeInOut',
          }
        }
      }}

      initial="hidden"
      animate="show"
      exit="exit"

      layout
    >
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
            {name}
          </Text>

          <Flex
            justify="space-between"
            w="100%"
            maxW="300px"
            mx={{
              base: "auto",
              lg: "0"
            }}
            mt="3"
          >
            <Box>
              <Text fontWeight="bold">Prix</Text>
              <Text>${price}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Quantité</Text>
              <Select 
                size="sm" 
                variant="filled"
                defaultValue={quantity}
                onChange={handleQuantityChange} 
                data-testid="select"
              >
                {Array.from({ length: availableQuantity }, (_, i) => i+1).map((qtd) => (
                  <option 
                    key={qtd}
                  >
                    {qtd}
                  </option>
                ))}
                
              </Select>
            </Box>

            <Box>
              <Text fontWeight="bold">Total</Text>
              <Text>${(price * quantity).toFixed(2)}</Text>
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
          onClick={handleRemove}
        >
          <Icon as={FaTimes}></Icon>
        </Button>
      </Stack>
    </MotionBox>
  )
}