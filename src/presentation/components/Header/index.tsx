import React from 'react';
import { HeaderContainer, Title } from './styles';

export const Header: React.FC<{title: string}> = ({title}) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer> 
  );
};
