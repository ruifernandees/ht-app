import React, { ReactNode } from 'react';
import { HeaderContainer, Title } from './styles';

export const Header: React.FC<{title: string, iconAtEnd?: ReactNode}> = ({title, iconAtEnd}) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {iconAtEnd}
    </HeaderContainer> 
  );
};
