import { Text, Link } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex 
      justify="center"
      align="center"
      flexDir="column"

      as="footer"

      w="100%"
      mx="auto" 
      mt={"8"}
      p={["6", "8"]}

      bg="gray.900"
    >
      <Text 
        mt="4" 
        fontSize={["smaller", "small"]}
        color="orange.200"
        textAlign="center"
      >
        Fait avec ❤ par Ênio Júnior à Brasília.
        <br/>
        <Link color="white" href="https://github.com/Juniorr452/mon-chocolat">
          Consultez le code source sur Github.
        </Link>
      </Text>
    </Flex>
  )
}

export default Footer;