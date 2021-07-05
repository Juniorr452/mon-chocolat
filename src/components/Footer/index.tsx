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

      bg="gray.800"
    >
      <Text 
        mt="4" 
        fontSize={["smaller", "small"]}
        color="gray.400"
        textAlign="center"
      >
        Fait avec ❤ par Ênio Júnior à Brasília.
        <br/>
        <Link color="gray.200" href="https://github.com/Juniorr452/mon-chocolat">
          Consultez le code source sur Github.
        </Link>
      </Text>
    </Flex>
  )
}

export default Footer;