import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, } from 'react-native'
import { API_Key } from '../../shares/constant'
import MovieItem from '../movies/MovieItem'
import { Movie } from '../../types/app'

export default function KeywordSearch(): JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])

  const handleKeywordSubmit = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1';`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_Key}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        if (response.results) {
          setMovies(response.results)
        } else {
          setMovies([])
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }
  return (
    <View>
      <TextInput
        value={keyword}
        style={styles.input}
        onChangeText={text => setKeyword(text)}
        onSubmitEditing={handleKeywordSubmit} />
      <View style={styles.flatList}>
        <FlatList
          data={movies}
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
          numColumns={3}
          ListEmptyComponent={<Text>No movies found.</Text>}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center'
  },
  itemContainer: {
    margin: 4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});