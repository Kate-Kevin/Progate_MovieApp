import React from 'react'
import Favorite from '../screens/Favorite'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const FavoriteStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="FavoriteScreen">
          <Stack.Screen name="FavoriteScreen" component={Favorite} options={{ title: 'Favorite', headerShown: false }}/>
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    )
}

export default FavoriteStackNavigation