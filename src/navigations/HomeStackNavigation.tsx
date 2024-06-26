import React from 'react'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={Home} options={{ title: 'Home', headerShown: false }}/>
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigation