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