import {
    View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity,
    Button, ImageBackground, Image, ScrollView
} from 'react-native'
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
    const url = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
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
            console.log("name ",name)
            createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
                setUser(userCred);
                //const user = userCred.user;
                console.log("HHKHJLHKLHKLHKHKH",user);
                updateProfile(userCred.user, {
                    displayName: name,
                    photoURL: url,
                })
                //setOutput('Register')
                navigation.replace("Step2_Register", { email, name });
                //console.log("guptaji")
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground source={require('../assets/register.jpg')} style={{ flex: 1 }}>


                <View style={{ paddingTop: 20 }} >
                    <Image source={require('../assets/chatlogo.jpg')}
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
                        <TextInput style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 8,
                            backgroundColor: 'white',
                            shadowColor: 'green',
                            elevation: 20
                        }} placeholder='Enter Name here'
                            value={name} onChangeText={(t) => { setName(t) }} />
                        {name ? /^[A-Za-z]+$/.test(name) || /^[a-zA-Z]+ [a-zA-Z]+$/.test(name) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> please enter valid name </Text>
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
                        }} placeholder='Enter email here' value={email} onChangeText={(t) => { setEmail(t) }} />
                        {email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> please enter valid email </Text>
                            : <Text style={{ color: 'red', alignSelf: "center", }}></Text>}
                        <View style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 8,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            shadowColor: 'green',
                            elevation: 20
                        }}>
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
                        {password ? /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(password) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> lower+upper+special char+digit</Text>
                            : <Text style={{ color: 'red', alignSelf: "center", }}> </Text>}
                        <View style={{
                            borderWidth: 0,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 8,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            shadowColor: 'green',
                            elevation: 20
                        }}>
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
                        {repassword ? /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(repassword) ?
                            <Text></Text> : <Text style={{ color: 'red', alignSelf: "center", }}> lower+upper+special char+digit</Text>
                            : <Text style={{ color: 'red', alignSelf: "center", }}> </Text>}

                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                            <Button title='Register' onPress={() => {
                                {
                                    if (email && name && password && repassword) {
                                        if ((/^[A-Za-z]+$/.test(name) || /^[a-zA-Z]+ [a-zA-Z]+$/.test(name))
                                            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
                                            && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(password)
                                            && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(repassword)) { onRegister(email, password) }
                                        else
                                            alert("Please Follow Instructions")
                                    }
                                    else
                                        alert("Please Fill All Details")
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
        //alignItems:'center',
        //backgroundColor:'#E4F4F3',
        //marginTop:20
    },
    registertext: {
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
    registertextinput: {
        borderWidth: 0,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20
    },
    textinputpasswordlayout: {
        borderWidth: 0,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'green',
        elevation: 20
    }
})
