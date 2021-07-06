import React from 'react';
import { MotionBox } from '../../motion';

const Main: React.FC = ({children}) => {
  return (
    <MotionBox
      as="main"
      flex="1"
    >
      {children}
    </MotionBox>
  )
}

export default Main;