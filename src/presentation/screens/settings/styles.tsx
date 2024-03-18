import { theme } from "@/global/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Modalize } from "react-native-modalize";


export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 ${RFValue(16)}px;
`;


export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})<{color?: string}>`
  background-color: ${({color}) => color || '#ddd'};
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  border-radius: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const ButtonText = styled.Text<{color?: string}>`
  color: ${({color}) => color || '#000'};
  font-family: ${theme.typography.fontFamily.inter.semiBold};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather).attrs(({color}) => ({
  size: RFValue(24),
  color: color || theme.colors.black,
}))`
  margin-left: ${RFValue(8)}px;
`;
export const Input = styled.TextInput`
  border-width: ${RFValue(1)}px;
  border-color: ${theme.colors.gray};
  border-radius: ${RFValue(10)}px;
  margin: ${RFValue(8)}px 0;
  font-size: ${RFValue(14)}px;
  padding: ${RFValue(14)}px ${RFValue(10)}px;
  min-width: ${RFValue(200)}px;

`
export const InputContainer = styled.View``

export const ErrorText = styled.Text`
  margin-top: ${RFValue(4)}px;
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.red};
`
export const Modal = styled(Modalize)`
`;

export const Title = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.bold};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const Subtitle = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.medium};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const ModalContent = styled.View`
  padding: ${RFValue(24)}px;
`;