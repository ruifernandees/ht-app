import { theme } from '@/global/theme'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const HeaderContainer = styled.View`
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-family: ${theme.typography.fontFamily.inter.black};
  font-size: ${RFValue(16)}px;
`
