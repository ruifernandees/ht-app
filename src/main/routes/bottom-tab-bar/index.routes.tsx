/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { appBottomTabRoutes } from './data'
import { EAppBottomTabRoutes } from '../mappers/EAppBottomTabRoutes'
import { theme } from '@/global/theme'
import { BottomNavigation } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export function BottomTabCollection() {
  return (
    <Tab.Navigator
      initialRouteName={EAppBottomTabRoutes.Home}
      screenOptions={({ route }) => ({
        tabBarIcon({ color, size }) {
          const screen = appBottomTabRoutes.find(
            (item) => item.name === route.name
          )
          const icon = screen?.icon({ color, size })
          return icon
        },
        tabBarActiveTintColor: theme.colors.blue,
        tabBarInactiveTintColor: theme.colors.gray,
        headerShown: false,
      })}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({
                focused,
                color,
                size: 24,
              })
            }

            return null
          }}
          getLabelText={({ route }) => route.name}
        />
      )}
    >
      {appBottomTabRoutes.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  )
}
