import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from '../components/movies/MovieItem'

export default function Favorite(): JSX.Element {

  const [movie, setMovie] = useState<Movie[]>([])

  useEffect(() => {
    getFavorite()
  }, [])

  const getFavorite = async (): Promise<any> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
      if (initialData !== null) {
        setMovie(JSON.parse(initialData))
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.center}>
      <FlatList
        style={styles.container}
        data={movie}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <MovieItem
              movie={item}
              coverType={'poster'}
              size={{
                width: 100,
                height: 160,
              }}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  center:{
    height: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    margin: 4,
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
})