import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Bookings from './Bookings/Bookings';
import Home from './Home';
import {useTheme} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          width: 240,
        },
        drawerContentStyle: {
          backgroundColor: colors.background,
        },
        drawerLabelStyle: {
          color: colors.text,
          fontWeight: 'bold',
        },
        drawerActiveTintColor: colors.tint,
        drawerInactiveTintColor: colors.background,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Bookings" component={Bookings} />
    </Drawer.Navigator>
  );
}
