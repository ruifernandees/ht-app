/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { theme } from '@/global/theme';
import SignLanguageImage from '@/assets/images/sign-language.png';

export const Title = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.black};
  font-size: ${RFValue(18)}px;
  margin: ${RFValue(24)}px 0;
`;

export const Banner = styled.Image.attrs({
  source: SignLanguageImage,
})`
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
`;
export const MainContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`;
export const LoginInput = styled.TextInput`
  border-width: ${RFValue(1)}px;
  border-color: ${theme.colors.gray};
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
  font-size: ${RFValue(14)}px;
  padding: ${RFValue(14)}px ${RFValue(10)}px;
  min-width: ${RFValue(200)}px;
`;
export const ChevronRight = styled(Feather).attrs({
  name: 'chevron-right',
  size: RFValue(24),
  color: theme.colors.white,
})`
  margin-left: ${RFValue(8)}px;
`;
export const ErrorText = styled.Text`
  margin-top: ${RFValue(4)}px;
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.red};
`;

export const InputContainer = styled.View``;

export const LoadingOverlayContainer = styled.View`
  position: absolute;
  z-index: 10;
  justify-content: center;
  align-items: center;
  background-color: rgba(0.5, 0.5, 0.5, 0.9);
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;
