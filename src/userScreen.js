import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export const UserScreen = ({navigation}) => {
  return (
    <View style={{flex:1,alignItems:'center',paddingTop:100}}>
       <TouchableOpacity onPress={()=>{navigation.navigate('List')}}>
        <View style={{borderRadius:10,backgroundColor:'lightgreen',
        width:150,alignItems:'center',padding:10,margin:10,shadowColor:'black',elevation:20}}>
           <Text style={{fontSize:22}}>User's List </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{navigation.navigate('chatList')}}>
        <View style={{borderRadius:10,backgroundColor:'lightgreen',
        width:150,alignItems:'center',padding:10,margin:10,shadowColor:'black',elevation:20}}>
           <Text style={{fontSize:22}}>Chat Page </Text>
        </View>
       </TouchableOpacity>
    </View>
  )
}

