import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Pressable,Image, ImageBackground, ScrollView } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { BackgroundScreenLogin } from './backgroundscreen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)
    const [user, setUser] = useState('')

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

    const onLogin = (email, password) => {
        if (!email || !password) {
            // if email or password is empty, show an error message
            alert("Please enter email and password");
            return;
          }
        
          if (!/\S+@\S+\.\S+/.test(email)) {
            // if email is not in a valid format, show an error message
            alert("Please enter a valid email");
            return;
          }
        
          if (password.length < 6) {
            // if password is less than 6 characters, show an error message
            alert("Password must be at least 6 characters long");
            return;
          }
        

        signInWithEmailAndPassword(auth, email, password).then((user) => {
            setUser(user);
            //setOutput("successfully login")
            console.log("Logged in");
            navigation.navigate("UserScreen");
            //console.log("guptaji1")
            console.log("Login user", user);
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <View style={{ flex: 1 }}>
            
            <ImageBackground source={require('../../chatapp/assets/register.jpg')} style={{ flex: 1 }}>
           
            <View>
                    <Image source={require('../../chatapp/assets/chatlogo.jpg')} 
                    style={{ marginTop:40, height: 150, width: 200,
                     alignSelf: 'center', borderRadius: 80 ,position:'absolute'}} />
                </View>
                <View style={styles.container}>
                    <View style={styles.text}>
                        <View>
                            <TextInput style={styles.textinput}
                                placeholder='Enter email here'
                                value={email}
                                onChangeText={(t) => { setEmail(t) }} />
                            <View style={styles.textinputpassword}>
                                <TextInput
                                    autoCapitalize='none'
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
                            <Button title='Login' onPress={() => { onLogin(email, password) }} />
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
        //backgroundColor: '#E4F4F3'
        marginTop:35
    },
    text: {
        padding: 10,
        backgroundColor: '#A4E5E0',
        shadowColor: 'black',
        elevation: 30,
        borderRadius: 10,
        margin: 25
    },
    textinput: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20
    },
    textinputpassword: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'green',
        elevation: 20
    }
})