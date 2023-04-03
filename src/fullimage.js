import { View, Text,Image, ScrollView ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
export const Fullimage = ({route,navigation}) => {
    const {item}=route.params
    //console.log(item)
  return (
    
    <View style={{backgroundColor:"grey",flex:1}}>
    <View style={{flex:1,borderWidth:2,borderRadius:20}}>
     <Image source={{ uri: item.imageUrl }} style={{flex:1,borderRadius:20}} resizeMode= "stretch" />
     <TouchableOpacity  onPress={()=>{navigation.goBack()}}
        style={{position:'absolute',alignSelf:'flex-start',padding:10}}>
        <Ionicons name="arrow-back-sharp" size={34} color="black" />
        </TouchableOpacity>
     </View>
 
    </View>
    
  )
}
