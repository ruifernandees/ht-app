import React from 'react';
import LoadingAnimation from '@/assets/animations/loading.json';
import LottieView from 'lottie-react-native';

export const Loading: React.FC = () => {
  return (
    <LottieView
      autoPlay
      loop	
      style={{
        width: 400,
        height: 400,
      }} 
      source={LoadingAnimation} 
    />
  );
};
