
import React from 'react';
import { OverlayContainer } from './styles';
import Loading from '@/assets/animations/loading.json';
import LottieView from 'lottie-react-native';

export const LoadingWithOverlay: React.FC = () => {
  return (
    <OverlayContainer>
      <LottieView
        autoPlay
        loop	
        style={{
          width: 400,
          height: 400,
        }} 
        source={Loading} 
      />
    </OverlayContainer>
  );
};
