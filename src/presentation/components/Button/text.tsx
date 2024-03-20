import {theme} from '@/global/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${RFValue(14)}px;
  font-family: ${theme.typography.fontFamily.inter.semiBold};
`;
