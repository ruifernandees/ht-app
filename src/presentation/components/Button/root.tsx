import {theme} from '@/global/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonRoot = styled.TouchableOpacity.attrs({
	activeOpacity: 0.7,
})`
  padding: ${RFValue(12)}px ${RFValue(24)}px;
  background-color: ${theme.colors.darkBlue};
  border-radius: ${RFValue(8)}px;
  margin: ${RFValue(16)}px;
  width: ${RFValue(200)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
