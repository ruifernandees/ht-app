import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabCollection } from './bottom-tab-bar/index.routes';
import { AuthenticationScreen } from '@/presentation/screens/authentication';
import { EAppStackRoutes } from './mappers/EAppStackRoutes';
import { AuthenticationProvider } from '@/presentation/provider/AuthenticationProvider';

const Stack = createNativeStackNavigator();

export function MainRouteCollection() {
  return (
    <NavigationContainer>
      <AuthenticationProvider>
        <Stack.Navigator
          initialRouteName={EAppStackRoutes.Authentication}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name={EAppStackRoutes.BottomTabNavigation}
            component={BottomTabCollection}
          />
          <Stack.Screen
            name={EAppStackRoutes.Authentication}
            component={AuthenticationScreen}
          />
        </Stack.Navigator>
      </AuthenticationProvider>
    </NavigationContainer>
  );
}
