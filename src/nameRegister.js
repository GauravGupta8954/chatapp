import {
    View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity,
    Button, ImageBackground, Image, ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BackgroundScreenRegister } from './backgroundscreen';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';

import { addDoc, db, collection, getFirestore } from '../App';
import { useRoute } from '@react-navigation/native';
export const RegisterStep2 = ({ navigation }) => {
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)

    const [user, setUser] = useState('')
    // const { email, password } = route.params;
    const route = useRoute();
    const myUserUid = auth.currentUser.uid;
    //console.log(route.params.email)
    const registerFinal = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: route.params.name,
                lastname: lastname,
                phone: phone,
                uid: myUserUid,
                email: route.params.email,
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

                <View style={{
                    flex: 1,
                    paddingTop: 20,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: 'lightblue',
                        shadowColor: 'black',
                        elevation: 30,
                        borderRadius: 15,
                        marginLeft: 25,
                        marginRight: 25,
                    }}>
                        {/* <TextInput style={styles.textinput} placeholder='Enter name here'
                            value={name} onChangeText={(t) => { setName(t) }} /> */}
                        <TextInput style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 8,
                            backgroundColor: 'white',
                            shadowColor: 'green',
                            elevation: 20
                        }} placeholder='Middle Name + Last Name'
                            value={lastname} onChangeText={(t) => { setLastName(t) }} />
                        {lastname ? /^[A-Za-z]+$/.test(lastname) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> please enter valid lastname </Text>
                            : <Text style={{ color: 'red', alignSelf: "center", }}></Text>}
                        <TextInput style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 8,
                            backgroundColor: 'white',
                            shadowColor: 'green',
                            elevation: 20
                        }} placeholder='Enter Phone no. here'
                            value={phone} onChangeText={(t) => { setPhone(t) }} />
                        {phone ? /^\d{10}$/.test(phone) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> please enter valid phone no. </Text>
                            : <Text style={{ color: 'red', alignSelf: "center", }}></Text>}
                        <View style={{ padding: 10 }}>
                            <Button title='Final Register' onPress={() => {
                                {
                                    if (lastname && phone) {
                                        if (/^\d{10}$/.test(phone) && /^[A-Za-z]+$/.test(lastname))
                                        { registerFinal() }
                                        else
                                        alert("Please follow instructions")
                                    }   
                                    else
                                    alert("please fill all details")    
                                }
                            }} />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
                            <View>
                                <Text>Already Registered ? </Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
                                    <Text style={{ color: 'blue' }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
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
    retextinput: {
        borderWidth: 0,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20
    },

})
