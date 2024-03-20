/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '@/assets/animations/loading.json';

export const Loading: React.FC = () => (
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
