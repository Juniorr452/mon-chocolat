import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TopNav from '../TopNav';
import Footer from '../Footer';

const Page: React.FC = ({children}) => {
  return (
    <>
      <TopNav />
      <Box
        as="main"
        flex="1"
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Page;