import { View, Text, StyleSheet, TextInput,Pressable,TouchableOpacity, Button,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { BackgroundScreenRegister } from './backgroundscreen';
 

export const Register = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [eyeicon, setEyeicon] = useState("eye-off")
    const [showpass, setShowpass] = useState(true)
    const [repassword, setRepassword] = useState('')
    
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
        if(password!==repassword)
        {
            Alert.alert('Hi User', 'Enter Same Password in both slot' ,[
                
                {
                    text:'Ok , I Understand',
                    onPress:()=> console.log("Ok pressed")
                }
            ])
        }

        else{
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            setUser(user);
            //setOutput('Register')
            navigation.navigate("home");
            //console.log("guptaji")
        }).catch((error) => {

        })}
    }

    return (
        <View style={{flex:1}}>
    <ImageBackground source={require('../../chatapp/assets/login.jpg')} style={{flex:1}}>
        <View style={styles.container}>
            
            <View style={styles.text}>
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
                <View style={{padding:10}}>
                <Button title='Register' onPress={()=>onRegister(email, password)} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                    <View>
                        <Text>Already Registered ? </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{navigation.navigate('login')}}>
                        <Text style={{color:'blue'}}>Login</Text>
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
        //backgroundColor:'#E4F4F3'
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
        shadowColor:'lightgreen',
        elevation:20
    },
    textinputpassword: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor:'lightgreen',
        elevation:20
    }
})
