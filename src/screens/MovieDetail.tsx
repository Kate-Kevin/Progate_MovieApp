import React from 'react'
import { View, Text , Button} from 'react-native'


export default function MovieDetail( { navigation } ): JSX.Element {
  return (
    <View>
      <Button title="Kembali" onPress={() => navigation.goBack()} />
    </View>
  )
}