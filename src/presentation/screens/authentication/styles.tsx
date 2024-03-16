import styled from "styled-components/native";
import SignLanguageImage from '@/assets/images/sign-language.png';
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "@/global/theme";
import { SafeAreaView } from "react-native-safe-area-context";

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
`
export const MainContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`
export const LoginInput = styled.TextInput`
  border-width: ${RFValue(1)}px;
  border-color: ${theme.colors.gray};
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px ;
  font-size: ${RFValue(12)}px;
  padding-top: ${RFValue(10)}px ;
  padding-bottom: ${RFValue(10)}px ;
  padding-left: ${RFValue(10)}px;
  padding-right: ${RFValue(24)}px;
  min-width: ${RFValue(200)}px;
`