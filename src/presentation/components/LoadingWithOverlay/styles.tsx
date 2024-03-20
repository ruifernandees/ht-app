import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

export const OverlayContainer = styled.View`
  position: fixed;
  z-index: 10;
  justify-content: center;
  align-items: center;
  background-color: rgba(0.5, 0.5, 0.5, 0.8);
  width: ${Dimensions.get('screen').width}px;
  height: ${Dimensions.get('screen').height}px;
`;
