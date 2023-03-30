import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Button, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BackgroundScreenRegister } from './backgroundscreen';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../App';


export const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)
    const [repassword, setRepassword] = useState('')
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const url="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    const passvisible = () => {
        if (eyeicon === 'eye') {
            setEyeicon('eye-off')
            setShowpass(true)
        }
        else if (eyeicon === 'eye-off') {
            setEyeicon('eye')
            setShowpass(false)
        }
    }
    const onRegister = () => {
        if (password !== repassword) {
            Alert.alert('Hi User', 'Enter Same Password in both slot', [

                {
                    text: 'Ok , I Understand',
                    onPress: () => console.log("Ok pressed")
                }
            ])
        }

        else {
            createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
                setUser(userCred);
                const user = userCred.user;
                console.log(user);
                updateProfile(user, {
                    displayName: name,
                    photoURL:url,
                })
                //setOutput('Register')
                navigation.navigate("Step2_Register",{email,});
                //console.log("guptaji")
            }).catch((error) => {
                console.log(error);
            })
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
                                <TextInput style={styles.textinput} placeholder='Enter Name here' value={name} onChangeText={(t) => { setName(t) }} />
                                <TextInput style={styles.textinput} placeholder='Enter email here' value={email} onChangeText={(t) => { setEmail(t) }} />
                                <View style={styles.textinputpassword}>
                                    <TextInput
                                        placeholder="Enter Your Password here"
                                        secureTextEntry={showpass}
                                        value={password}
                                        textContentType="password"
                                        onChangeText={(text) => { setPassword(text) }} />
                                    <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                        <Pressable onPress={() => { passvisible() }}>
                                            <Ionicons style={{ alignSelf: 'flex-end' }} name={eyeicon} size={22} color="black" />
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.textinputpassword}>
                                    <TextInput
                                        placeholder="Re-Write Password here"
                                        secureTextEntry={showpass}
                                        value={repassword}
                                        textContentType="password"
                                        onChangeText={(text) => { setRepassword(text) }} />
                                    <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                                        <Pressable onPress={() => { passvisible() }}>
                                            <Ionicons style={{ alignSelf: 'flex-end' }} name={eyeicon} size={22} color="black" />
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Button title='Register' onPress={() => onRegister(email, password)} />
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
