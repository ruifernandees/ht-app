 import React, { useEffect } from 'react';
import { useAuthenticationStore } from '../stores/authentication';
import { useNavigation } from '@react-navigation/native';
import { EAppStackRoutes } from '@/main/routes/mappers/EAppStackRoutes';
 
export const AuthenticationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { user } = useAuthenticationStore()
  const { navigate } = useNavigation();

	useEffect(() => {
		if (user) {
			navigate(EAppStackRoutes.BottomTabNavigation as never);
		}
	}, [user])
  return children;
};
 
	