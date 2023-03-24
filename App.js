import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/login';
import { Register } from './src/register';
import { Chatpage } from './src/chatpage';
import { Testing } from './src/testing';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const Stack=createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBcCRIkP8E1Sq8STWFhJGf31yLt6ivN_mQ",
  authDomain: "chat-adda-62ba2.firebaseapp.com",
  projectId: "chat-adda-62ba2",
  storageBucket: "chat-adda-62ba2.appspot.com",
  messagingSenderId: "906968723810",
  appId: "1:906968723810:web:7e7c838f0cbfcb29223c3b"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='register' component={Register} options={{headerShown:false}} />
        <Stack.Screen name='Chat' component={Chatpage} options={{headerShown:false}} /> 
        <Stack.Screen name='testing' component={Testing} options={{headerShown:false}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
