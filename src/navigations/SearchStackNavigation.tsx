import React from 'react'
import Search from '../screens/Search'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import CategoryItem from '../screens/CategoryItem'

const Stack = createNativeStackNavigator()

const SearchStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="SearchScreen">
          <Stack.Screen name="SearchScreen" component={Search} options={{ title: 'Search', headerShown: false }}/>
          <Stack.Screen name="CategorySearchResult" component={CategoryItem} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    )
}

export default SearchStackNavigation