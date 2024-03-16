/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {appBottomTabRoutes} from './data';
import {EAppBottomTabRoutes} from '../mappers/EAppBottomTabRoutes';
import {theme} from '@/global/theme';

const Tab = createBottomTabNavigator();

export function BottomTabCollection() {
	return (
		<Tab.Navigator
			initialRouteName={EAppBottomTabRoutes.Home}
			screenOptions={({route}) => ({
				tabBarIcon({color, size}) {
					const screen = appBottomTabRoutes.find(item => item.name === route.name);
					const icon = screen?.icon({color, size});
					return icon;
				},
				tabBarActiveTintColor: theme.colors.blue,
				tabBarInactiveTintColor: theme.colors.gray,
			})}
		>
			{
				appBottomTabRoutes.map(screen => (
					<Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
				))
			}
		</Tab.Navigator>
	);
}
