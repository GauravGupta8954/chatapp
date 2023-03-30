import {
    View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity,
    Button, ImageBackground, Image, ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BackgroundScreenRegister } from './backgroundscreen';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';
 
import { addDoc,db,collection,getFirestore } from '../App';
import { useRoute } from '@react-navigation/native';
export const RegisterStep2 = ({ navigation }) => {
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)

    const [user, setUser] = useState('')
   // const { email, password } = route.params;
   const route=useRoute();
     const myUserUid = auth.currentUser.uid;
    //console.log(route.params.email)
    const registerFinal = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
              name: name,
              lastname: lastname,
              phone: phone,
              uid: myUserUid,
              email:route.params.email,
              //photoURL:auth.currentUser.photoURL
            });
            navigation.navigate('UserScreen');
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground source={require('../../chatapp/assets/login1.jpg')} style={{ flex: 1 }}>


                <View style={{ paddingTop: 20 }} >
                    <Image source={require('../../chatapp/assets/chatlogo.jpg')}
                        style={{
                            marginTop: 30, height: 150, width: 200,
                            alignSelf: 'center', borderRadius: 80, resizeMode: 'cover', position: 'absolute'
                        }} />
                </View>

                <View style={styles.container}>
                    <View style={styles.text}>
                        <TextInput style={styles.textinput} placeholder='Enter name here'
                            value={name} onChangeText={(t) => { setName(t) }} />
                        <TextInput style={styles.textinput} placeholder='Middle Name + Last Name'
                            value={lastname} onChangeText={(t) => { setLastName(t) }} />
                        <TextInput style={styles.textinput} placeholder='Enter Phone no. here'
                            value={phone} onChangeText={(t) => { setPhone(t) }} />
                        <View style={{ padding: 10 }}>
                            <Button title='Final Register' onPress={()=>{registerFinal()}}/>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
                            <View>
                                <Text>Already Registered ? </Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
                                    <Text style={{ color: 'blue' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignContent: 'center',
        //backgroundColor:'#E4F4F3',
        //marginTop:20
    },
    text: {
        padding: 10,
        backgroundColor: 'lightblue',
        shadowColor: 'black',
        elevation: 30,
        borderRadius: 15,
        marginLeft: 25,
        marginRight: 25,
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    textinput: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 8,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20
    },
    textinputpassword: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'green',
        elevation: 20
    }
})
