import {useColorScheme} from 'react-native';
import React from 'react';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import {DarkTheme, MyTheme} from "./components/Themes/MyTheme"

export default function App() {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();

  const theme = scheme === 'dark'? DarkTheme: MyTheme;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
