import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Pressable,Image, ImageBackground,
     ScrollView, ToastAndroid } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { BackgroundScreenLogin } from './backgroundscreen';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';
import AsyncStorage from "@react-native-async-storage/async-storage"

// const saveUserData = async (userData) => {
//     try {
//       await AsyncStorage.setItem('userData', JSON.stringify(userData));
//       console.log(userData);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };
   
//   const getUserData = async () => {
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       if (userData !== null) {
//         return JSON.parse(userData);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)
    const [user, setUser] = useState('')
    const url = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
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
  
    // useEffect(() => {
    //     getUserData().then((userData) => {
    //       if (userData) {
            
    //         navigation.replace("UserScreen")
    //         setUser(userData);
    //       }
    //     });
    //   }, []);

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
           // saveUserData(user);
            //setOutput("successfully login")
           // console.log("Logged in");
            navigation.replace("UserScreen");
           // console.log(userData ,"hello")
            // console.log(auth.currentUser.uid)
            // console.log("Login user", user);
            ToastAndroid.showWithGravityAndOffset(
               "Logged in Successfully",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
        }).catch((error) => {
            console.log(error.toString());
            ToastAndroid.showWithGravityAndOffset(
                error.toString(),
                 ToastAndroid.LONG,
                 ToastAndroid.BOTTOM,
                 25,
                 50,
               );
        })
    }


    return (
        <View style={{ flex: 1 }}>
            
            <ImageBackground source={require('../assets/login1.jpg')} style={{ flex: 1 }}>
           
            <View>
                    <Image source={require('../assets/chatlogo.jpg')} 
                    style={{ marginTop:40, height: 150, width: 200,
                     alignSelf: 'center', borderRadius: 80 ,position:'absolute'}} />
                </View>
                <View style={{flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        //backgroundColor: '#E4F4F3'
        marginTop:35}}>
                    <View style={{padding: 10,
        backgroundColor: '#A4E5E0',
        shadowColor: 'black',
        elevation: 30,
        borderRadius: 10,
        margin: 25}}>
                        <View>
                            <TextInput style={{borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20}}
                                placeholder='Enter email here'
                                value={email}
                                onChangeText={(t) => { setEmail(t) }} />
                            <View style={{borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'green',
        elevation: 20}}>
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
                                <TouchableOpacity onPress={() => { navigation.replace('register') }}>
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
    logincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        //backgroundColor: '#E4F4F3'
        marginTop:35
    },
    logintext: {
        padding: 10,
        backgroundColor: '#A4E5E0',
        shadowColor: 'black',
        elevation: 30,
        borderRadius: 10,
        margin: 25
    },
    logintextinput: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'green',
        elevation: 20
    },
    logintextinputpassword: {
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