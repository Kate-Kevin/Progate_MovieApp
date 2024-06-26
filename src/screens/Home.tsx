import React from 'react'
import { View, Text , Button} from 'react-native'


export default function Home({ navigation }): JSX.Element {
  return (
    <View>
      <Button title="Movie Detail" onPress={() => navigation.navigate('MovieDetail')} />
    </View>
  )
}