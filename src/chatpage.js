import { View, Text, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { BackgroundScreen } from './backgroundscreen'

export const Chatpage = () => {
  const [data, setData] = useState('')
  return (

    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../chatapp/assets/chat.jpg')} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <TextInput style={{ borderRadius: 10, borderWidth: 1, padding: 10, margin: 5, alignSelf: 'flex-end' }}
            value={data} onChangeText={(t) => { setData(t) }} />
        </View>
      </View>

    </ImageBackground>
    </View >
  )
}

