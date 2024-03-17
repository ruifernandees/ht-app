import styled from "styled-components/native";

import { Dimensions } from "react-native";

export const OverlayContainer = styled.View`
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
  background-color: rgba(0.5,0.5,0.5,0.8);
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;