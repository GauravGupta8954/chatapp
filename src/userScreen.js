import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../App';
import AsyncStorage from "@react-native-async-storage/async-storage"
export const UserScreen = ({navigation}) => {
   onLogout=()=>{
      //AsyncStorage.removeItem('userData');
       
      signOut(auth).then(() => {
         // Sign-out successful.
         console.log("logout")
         navigation.replace("login")
       }).catch((error) => {
        console.log(error)
       });
   }
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
       {/* <TouchableOpacity onPress={()=>{navigation.navigate('facedetection')}}>
        <View style={{borderRadius:10,backgroundColor:'lightgreen',
        width:150,alignItems:'center',padding:10,margin:10,shadowColor:'black',elevation:20}}>
           <Text style={{fontSize:22}}>Face </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{navigation.navigate('barcode')}}>
        <View style={{borderRadius:10,backgroundColor:'lightgreen',
        width:150,alignItems:'center',padding:10,margin:10,shadowColor:'black',elevation:20}}>
           <Text style={{fontSize:22}}>barcode </Text>
        </View>
       </TouchableOpacity> */}
       <TouchableOpacity onPress={()=>{{onLogout()}}} 
       style={{justifyContent:'flex-end',flex:1,paddingBottom:20}}>
        <View style={{borderRadius:40,backgroundColor:'lightgreen',
        width:120,alignItems:'center',padding:10,margin:10,shadowColor:'black',elevation:20}}>
           <Text style={{fontSize:22}}>logout </Text>
        </View>
       </TouchableOpacity>
    </View>
  )
}

