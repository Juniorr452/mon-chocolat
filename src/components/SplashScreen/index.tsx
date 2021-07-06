import Image from 'next/image'
import { CircularProgress, VStack } from '@chakra-ui/react';
import { AnimatePresence, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MotionFlex } from '../../motion';

import logo from '../../public/logo.svg';

const transition = {
  ease: [0.6, 0.01, -0.05, 0.95],
  duration: .5
}

const variants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    transition
  },
  show: { 
    opacity: 1,
    scale: 1,
    transition
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition
  },
}

const isCypress = () => {
  if(!process.browser)
    return false;

  return !!(window as any).Cypress;
}

const SplashScreen: React.FC = ({children}) => {
  const [loading, setLoading] = useState(!isCypress());

  useEffect(() => {
    async function load() {
      await new Promise((res) => setTimeout(res, 2000));

      setLoading(false);
    }

    if(loading)
      load();
  })

  return (
    <AnimatePresence exitBeforeEnter>
      {loading ? (
        <MotionFlex
          key="splash"
          direction="column"
          justify="center"
          align="center"
          h="100vh"

          variants={variants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <VStack
            mb="100px"
            spacing="8"
          >
            <Image src={logo} alt="Logo" height="125"/>
            <CircularProgress isIndeterminate color="orange.500" thickness="6px" size="40px"/>
          </VStack>
        </MotionFlex>
      ) : (
        <MotionFlex 
          key="app"
          direction="column"
          minH="100vh"

          variants={{
            hidden: { opacity: 0, scale: 1.05, transition: { duration: .25, ease: 'easeOut'}  },
            show: { opacity: 1, scale: 1.0, transition: { duration: .25, ease: 'easeOut'} }
          }}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {children}
        </MotionFlex>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;