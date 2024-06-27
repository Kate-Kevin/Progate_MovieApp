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
    <FlatList
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
      numColumns={4} // Mengatur jumlah kolom
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 4, // Margin antara item
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
})