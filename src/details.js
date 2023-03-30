import { View, Text, Touchable, TouchableOpacity,Image ,StyleSheet} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { auth } from '../App';
export const Details = ({navigation}) => {
  const route = useRoute();
  console.log(auth.currentUser.photoURL)
 // const imagevar=require("auth.currentUser.photoURL")
  return (
    <View style={{ paddingTop: 100, }}>
      <View style={{
        alignItems: 'center', borderRadius: 10,
        backgroundColor: '#F4F5DC', borderWidth: 1, borderColor: 'black', padding: 10, margin: 15
      }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: auth.currentUser.photoURL
        }}
      />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name : {route.params.item.name}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: {route.params.item.email}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Id : </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{route.params.item.id}</Text>
      </View>
      <View style={{alignItems:"baseline",alignItems:'center'}}>
    <TouchableOpacity style={{borderRadius:10,borderWidth:1,
    backgroundColor:'brown',
    padding:10 ,margin:10}} 
    onPress={()=>{navigation.navigate('List')}}>
      <Text style={{fontSize:20,alignContent:'center',alignItems:'center',
      fontWeight:'bold'}}>Got it!</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

const styles=StyleSheet.create({
  tinyLogo:{
    height:100,
    width:100,
  }
})