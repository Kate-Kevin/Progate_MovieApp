import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { API_Key } from '../../shares/constant'
import { useNavigation, StackActions } from '@react-navigation/native'

export default function CategorySearch(): JSX.Element {
  const [genres, setGenres] = useState<any>([])
  const [selectedGenre, setSelectedGenre] = useState<number[]>([])

  const navigation = useNavigation()
  const pushAction = StackActions.push('CategorySearchResult',{genre: selectedGenre})

  useEffect(() => {
    getAllGenre()

  }, [])

  const getAllGenre = () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_Key}`
      }
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        if (response) {
          setGenres(response.genres)
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }
  const toggleGenreSelection = (genreId:number) => {
    if (selectedGenre.includes(genreId)) {
      setSelectedGenre(selectedGenre.filter(id => id !== genreId))
    } else {
      setSelectedGenre([...selectedGenre, genreId])
    }
  }

  console.log(selectedGenre)
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={genres}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={{
              ...styles.topBar,
              backgroundColor: selectedGenre.includes(item.id) ? '#8978A4' : '#C0B4D5',
              borderRadius: 20,
            }}
            onPress={() => toggleGenreSelection(item.id)}>

            <Text>{item.name}</Text>
          </TouchableOpacity>

        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <View style={styles.searchButtonContainer}>

        <TouchableOpacity style={styles.searchButton} onPress={() => {navigation.dispatch(pushAction) }}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    position: 'relative',
    maxHeight: '100%'
  },
  flatList: {
    height: '89%',
    position: 'relative'
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topBar: {

    alignItems: 'center',
    justifyContent: 'center',
    width: '49%',
    height: 60,
    marginRight: 3,
    marginBottom: 3
  },
  topBarLabel: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  searchButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    width: '100%',
  },
  searchButton: {
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#8978A4',
    marginTop: 10,
    borderRadius: 25,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})