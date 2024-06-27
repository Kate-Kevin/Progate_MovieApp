import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar, Dimensions, ImageBackground } from 'react-native'
import MovieList from '../components/movies/MovieList'
import { API_Key } from "../shares/constant";
import { Movie } from '../types/app';
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window')

const imageSize = {
  width: width,
  height: 160,

}

const MovieDetail = ({ route }: any): JSX.Element => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const { id } = route.params

  useEffect(() => {
    getMovieDetail()
  }, [])

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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
        setMovie(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }
  //console.log(movie)
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={[imageSize, styles.backgroundImage]}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie?.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>


      <View style={styles.detailsContainer}>
        <Text>{movie?.overview}</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Original Language:</Text>
          <Text style={styles.detailText}>{movie?.original_language}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Popularity:</Text>
          <Text style={styles.detailText}>{movie?.popularity}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Release Date:</Text>
          <Text style={styles.detailText}>{movie?.release_date.toString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Vote Count:</Text>
          <Text style={styles.detailText}>{movie?.vote_count}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <MovieList
          title={'Rekomendation'}
          path={`movie/${id}/recommendations?language=en-US&page=1`}
          coverType={'poster'}
          key={id}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
  backgroundImage: {
    marginRight: 4,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
  },
  detailItem: {
    width: '45%',
    marginVertical: 8,
  },
  detailTitle: {
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
  },

})
export default MovieDetail