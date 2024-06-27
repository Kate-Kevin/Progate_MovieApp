import React from 'react'
import { ScrollView, View, StatusBar, StyleSheet } from 'react-native'
import type { MovieListProps } from '../types/app'
import MovieList from '../components/movies/MovieList'
import { Path_Now_Playing, Path_Popular, Path_Top_Rated, Path_Upcoming } from "../shares/constant";

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: Path_Now_Playing,
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: Path_Upcoming,
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: Path_Top_Rated,
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: Path_Popular,
    coverType: 'poster',
  },
]

const Home = (): JSX.Element => {
  return (
    <ScrollView>
    <View style={styles.container}>
      {movieLists.map((movieList) => (
        <MovieList
          title={movieList.title}
          path={movieList.path}
          coverType={movieList.coverType}
          key={movieList.title}
        />
      ))}
      <StatusBar translucent= {false} />
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
})

export default Home