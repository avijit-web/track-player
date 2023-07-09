import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Music from './screens/Music';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name='Music'
            component={Music}
            options={{headerShown:false}}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator