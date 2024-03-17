
import React from 'react';
import { OverlayContainer } from './styles';

import { Loading } from '../Loading';

export const LoadingWithOverlay: React.FC = () => {
  return (
    <OverlayContainer>
      <Loading />
    </OverlayContainer>
  );
};
