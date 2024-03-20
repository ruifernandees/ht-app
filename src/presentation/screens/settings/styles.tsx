/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Divider as MdDivider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { theme } from '@/global/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const Content = styled.ScrollView`
  padding: 0 ${RFValue(16)}px;
`;

export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{ color?: string }>`
  background-color: ${({ color }) => color || '#ddd'};
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  border-radius: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

export const ButtonText = styled.Text<{ color?: string }>`
  color: ${({ color }) => color || '#000'};
  font-family: ${theme.typography.fontFamily.inter.semiBold};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather).attrs(({ color }) => ({
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
`;
export const InputContainer = styled.View``;

export const InputHorizontalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: aqua; */
`;

export const ErrorText = styled.Text`
  margin-bottom: ${RFValue(14)}px;
  font-size: ${RFValue(12)}px;
  color: ${theme.colors.red};
`;

export const Title = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.bold};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const Subtitle = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.medium};
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  margin-top: ${RFValue(16)}px;
`;

export const SegmentedButtonsContainer = styled.View`
  margin-top: ${RFValue(12)}px;
  margin-bottom: ${RFValue(24)}px;
`;

export const ColorDisplay = styled.View<{ color?: string }>`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  background-color: ${({ color }) => color || 'transparent'};
  border-width: ${RFValue(1)}px;
  border-color: ${theme.colors.black};
  border-radius: ${RFValue(5)}px;
`;

export const Divider = styled(MdDivider)`
  margin-bottom: ${RFValue(24)}px;
`;
