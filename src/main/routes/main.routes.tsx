import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabCollection} from './bottom-tab-bar/index.routes';
import {AuthenticationScreen} from '@/presentation/screens/authentication';
import {EAppStackRoutes} from './mappers/EAppStackRoutes';

const Stack = createNativeStackNavigator();

export function MainRouteCollection() {
	return (
		<NavigationContainer >
			<Stack.Navigator
				initialRouteName={EAppStackRoutes.BottomTabNavigation}
				screenOptions={{headerShown: false}}
			>
				<Stack.Screen name={EAppStackRoutes.BottomTabNavigation} component={BottomTabCollection} />
				<Stack.Screen name={EAppStackRoutes.Authentication} component={AuthenticationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

