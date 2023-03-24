import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Pressable,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { BackgroundScreenLogin } from './backgroundscreen';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)


    const navigation = useNavigation();
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

    const onLogin = (lemail,lpassword) => {
        
        signInWithEmailAndPassword(auth, lemail, lpassword).then((user) => {
            setUser(user);
            //setOutput("successfully login")
            console.log("Logged in");
            navigation.navigate("Chat");
            //console.log("guptaji1")
        }).catch((error) => {
            
        })
    }


    return (
        <View style={{flex:1}}>
        <ImageBackground source={require('../../chatapp/assets/login.jpg')} style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.text}>
                    <View>
                        <TextInput style={styles.textinput}
                            placeholder='Enter email here'
                            value={email}
                            onChangeText={(t) => { setEmail(t) }} />
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
                    </View>
                    <View style={{ padding: 10 }}>
                        <Button title='Login' onPress={() => { onLogin(email, password)}} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                        <View>
                            <Text>Not Registered ? </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('register') }}>
                                <Text style={{ color: 'blue' }}>Register</Text>
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
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#E4F4F3'
    },
    text: {
        padding: 10,
        backgroundColor: 'lightblue',
        shadowColor: 'black',
        elevation: 30,
        borderRadius: 10,
        margin: 25
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'lightgreen',
        elevation: 20
    },
    textinputpassword: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'lightgreen',
        elevation: 20
    }
})