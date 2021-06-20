import { Icon, Button, ButtonProps } from '@chakra-ui/react';

interface IconButtonProps extends ButtonProps {
  icon: any;
  href?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({icon, as, p, fontSize, href}) => (
  <Button
    p={p}
    as={as}
    bg="transparent"
    _hover={{
      bg: "gray.500"
    }}
    border="1px"
    borderColor="gray.400"
    borderRadius="100%"
    href={href}
  >
    <Icon as={icon} fontSize={fontSize}/>
  </Button>
)