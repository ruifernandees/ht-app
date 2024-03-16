/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/presentation/screens/home';

const Stack = createNativeStackNavigator();

export function RouteCollection() {
	return (
		<NavigationContainer >
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
