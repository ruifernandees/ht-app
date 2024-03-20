/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { theme } from '@/global/theme';

export const Container = styled(SafeAreaView)<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || theme.colors.black};
`;

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.inter.black};
  font-size: ${RFValue(16)}px;
  margin: ${RFValue(16)}px;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
