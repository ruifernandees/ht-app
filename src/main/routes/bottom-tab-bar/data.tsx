import React from 'react';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '@/presentation/screens/home';
import { SettingsScreen } from '@/presentation/screens/settings';
import { EAppBottomTabRoutes } from '../mappers/EAppBottomTabRoutes';
import { type TIconProps } from './props';

export const appBottomTabRoutes = [
  {
    name: EAppBottomTabRoutes.Home,
    icon: (props: TIconProps) => <Feather name="home" {...props} />,
    component: HomeScreen,
  },
  {
    name: EAppBottomTabRoutes.Settings,
    icon: (props: TIconProps) => <Feather name="settings" {...props} />,
    component: SettingsScreen,
  },
];
