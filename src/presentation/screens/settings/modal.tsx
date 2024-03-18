import React from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';

export const Modal: React.FC = (props: ModalizeProps) => {
  return (
    <Modalize 
      {...props}
    />
  );
};
