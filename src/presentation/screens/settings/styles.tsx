import { theme } from "@/global/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";


export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: #ccc;
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  margin: 0 ${RFValue(16)}px;
  border-radius: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.semiBold};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather).attrs({
  size: RFValue(24),
  color: theme.colors.black,
})`
  margin-left: ${RFValue(8)}px;
`;