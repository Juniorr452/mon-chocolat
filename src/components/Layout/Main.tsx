import { Variants } from 'framer-motion';
import React from 'react';
import { MotionBox } from '../../motion';

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

const Main: React.FC = ({children}) => {
  return (
    <MotionBox
      as="main"
      flex="1"
      variants={variants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {children}
    </MotionBox>
  )
}

export default Main;