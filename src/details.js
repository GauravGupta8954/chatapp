import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { auth } from '../App';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export const Details = ({ navigation }) => {
  const route = useRoute();
  //console.log(auth.currentUser.photoURL)
  // const imagevar=require("auth.currentUser.photoURL")
  const itemId = route.params.item.id
  //console.log("hhhhhhhhhhhh")
  //console.log(auth.currentUser)
  //console.log("auth.currentUser")
  //console.log(route.params.item)
  return (
    <View style={{ paddingTop: 100, }}>
      <View style={{
        alignItems: 'center', borderRadius: 10,
        backgroundColor: '#F4F5DC', borderWidth: 1, borderColor: 'black', padding: 10, margin: 15
      }}>{route.params.item.DailyProfileUrl ?
        <View>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: route.params.item.DailyProfileUrl
            }}
          />
          <TouchableOpacity onPress={() => { navigation.navigate("detailcamerasetup", { itemId }) }}>
            <FontAwesome5 style={{ alignSelf: "flex-end", justifyContent: 'flex-end', }} name="camera" size={30} color="white" />
          </TouchableOpacity>
        </View>
        : <FontAwesome name="picture-o" size={40} color="black" />}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name : {route.params.item.name}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: {route.params.item.email}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Id : </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{route.params.item.id}</Text>
      </View>
      <View style={{ alignItems: "baseline", alignItems: 'center' }}>
        <TouchableOpacity style={{
          borderRadius: 10, borderWidth: 1,
          backgroundColor: 'brown',
          padding: 10, margin: 10
        }}
          onPress={() => { navigation.navigate('List') }}>
          <Text style={{
            fontSize: 20, alignContent: 'center', alignItems: 'center',
            fontWeight: 'bold'
          }}>Got it!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tinyLogo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    //position: 'absolute'
  }
})