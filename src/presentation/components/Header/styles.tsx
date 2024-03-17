import { theme } from "@/global/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  padding: ${RFValue(12)}px ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.black};
  font-size: ${RFValue(16)}px;
`;