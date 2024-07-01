import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { API_Key } from '../shares/constant';
import { Movie } from '../types/app';
import MovieItem from '../components/movies/MovieItem';

const CategoryItem = ({ route }: any): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([])

  const combinedGenre = route.params.genre.join('%2C');

  useEffect(() => {
    getByGenre()

  }, [])
  /* console.log(movies) */

  const getByGenre = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${combinedGenre}`
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
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }
  return (
    <View style={styles.container}> 
        <FlatList
          style={styles.containerFlatlist}
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
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    alignItems: 'center'
  },
  containerFlatlist: {
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
export default CategoryItem