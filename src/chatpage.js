import { View, Text, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { BackgroundScreen } from './backgroundscreen'
import { MaterialIcons } from '@expo/vector-icons';
export const Chatpage = () => {
  const [data, setData] = useState('')
  return (

    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../chatapp/assets/chat1.jpg')} style={{ flex: 1 }}>
        <View style={{}}>
          <Text style={{ color: '#05445E', fontSize: 35, fontWeight: 'bold', alignSelf: 'center', paddingTop: 30 }}>
            Hi User </Text>

        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end',flexDirection:'row' }} >
          <View style={{ flex: 1, justifyContent: 'flex-end',alignContent:'center'}}>
            <TextInput style={{
              borderRadius: 10, borderWidth: 1,
              padding: 8,margin:5, backgroundColor: '#D3F4FB', borderColor: '#00B6BC'
              , shadowColor: 'black', elevation: 10,alignSelf:'flex-end'
            }}
              value={data} onChangeText={(t) => { setData(t) }} />
          </View>
          <View style={{ flex: 1,justifyContent:'flex-end' ,margin:10}}>
          <MaterialIcons style={{ alignSelf: 'flex-end' }} name="send" size={24} color="black" />
          </View>
        </View>
      </ImageBackground>
    </View >
  )
}

