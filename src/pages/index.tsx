import React from 'react';
import Head from 'next/head'
import { Container, HStack, Heading, SimpleGrid, CircularProgress, Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import ProductItem from '../components/ProductItem';
import Page from '../components/Page';

interface Product {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
}

export default function Home() {
  const { data: products, isLoading, isFetching } = useQuery<Product[]>('products', async () => {
    const response = await fetch('/api/products');
    const data = await response.json();

    return data.products;
  }, {
    staleTime: 15 * 60 * 1000,
  });

  return (
    <Page>
      <Head>
        <title>Mon Chocolat</title>
        <meta name="description" content="Projet fait par Ênio Júnior" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container 
        maxW={{
          base: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl'
        }}
        mt="12"
        mb="6"
      >
        <HStack justify="space-between">
          <HStack spacing="4">
            <Heading as="h1">Store</Heading>
            {!isLoading && isFetching && (
              <CircularProgress
                isIndeterminate
                size="20px"
                color="pink.400" 
              />
            )}
          </HStack>
        </HStack>
      </Container>

      <Container 
        maxW={{
          base: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl'
        }}
        transition="opacity 0.2s linear"
        opacity={isFetching ? 0.9 : 1}
        py="4"
      >
        {!isLoading && (
          <SimpleGrid minChildWidth="300px" gap="40px" maxW="992px" mx="auto" data-testid="products-list">
            {products && products.map(product => <ProductItem key={product.id} {...product}/>)}
          </SimpleGrid>
        )}

        {isLoading && (
          <Box w="fit-content" mx="auto">
            <CircularProgress 
              isIndeterminate 
              color="pink.400" 
              size="100px"
              thickness="6px"
            />
          </Box>
        )}
      </Container>
    </Page>
  )
}