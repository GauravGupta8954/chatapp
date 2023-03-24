import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/login';
import { Register } from './src/register';
import { Chatpage } from './src/chatpage';
import { Testing } from './src/testing';
import { initializeApp } from "firebase/app";

const Stack=createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyDBDxaXOgouCI2raTknR7dVTCFzKEy0QjE",
  authDomain: "chatapp-4869f.firebaseapp.com",
  projectId: "chatapp-4869f",
  storageBucket: "chatapp-4869f.appspot.com",
  messagingSenderId: "96337731438",
  appId: "1:96337731438:web:3d9f9fb8a760fbc66e6b7f"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='register' component={Register}/>
        <Stack.Screen name='Chat' component={Chatpage}/> 
        <Stack.Screen name='testing' component={Testing}/> 
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
