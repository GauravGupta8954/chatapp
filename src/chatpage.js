import {
  View, Text, TextInput, ImageBackground, TouchableOpacity,
  Button, FlatList, StyleSheet
} from 'react-native'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { BackgroundScreen } from './backgroundscreen'
import { MaterialIcons } from '@expo/vector-icons';
import { db, addDoc, collection, auth } from '../App';
import { onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import {
  ScrollIntoView, scrollToEnd
} from 'react-native-scroll-into-view';

export const Chatpage = ({ route }) => {
  const backimage = require('../../chatapp/assets/chat3.jpg')
  const [currentDate, setCurrentDate] = useState('');
  const [data, setData] = useState('')
  const [press, setPress] = useState(true);
  const { item } = route.params;
  // console.log(item.id);
  const chatId = item.id
  const [user, setUser] = useState([]);
  //let listViewref;
  const ref = collection(db, `chats/${chatId}/messages`)
  const messagesQuery = query(ref, orderBy('timestamp'));
  const messagesEndref = useRef();

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        const { timestamp, name, message, uid } = doc.data();
        user.push({
          id: doc.id,
          name,
          timestamp,
          message,
          uid,
        });
      });
      setUser(user)
      //console.log(user)
      //messagesEndref.current.scrollToEnd();
    })

    return () => unsubscribe();
  }, []);
  function formatTimestamp(timestamp) {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  useEffect(()=>{
    if(user.length>0){
      messagesEndref.current.scrollToEnd();
      }
  },[])
  useEffect(()=>{
    if(user.length>0){
      messagesEndref.current.scrollToEnd();
      }
  },[press])


  // useEffect(() => {
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   setCurrentDate(
  //     date + '/' + month + '/' + year 
  //     + ' ' + hours + ':' + min + ':' + sec
  //   );
  // }, []);
  const sendMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
        message: data,
        uid: auth.currentUser.uid,
        //email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
      });
      setData('')
      setPress(false);
      //listViewref.scrollToEnd({animated:true})

      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  function isUser(item) {
    //console.log(auth.currentUser.uid)
    return item.uid === auth.currentUser.uid
  }
  
  
  return (

    <View style={{ flex: 1 }} >
      <ImageBackground source={backimage} style={{ flex: 1 }}>
        <View style={{}}>
          <Text style={{ color: '#05445E', fontSize: 35, fontWeight: 'bold', alignSelf: 'center', paddingTop: 30 }}>
            Hi {item.chatName} </Text>
          {/* <Button title='Register2' onPress={()=>{navigation.navigate('Step2_Register')}}/> */}
        </View>
        <FlatList
          data={user}
          
          //keyExtractor={item=item.id}
          //ref={(ref)=>{listViewref=ref}}
          ref={messagesEndref}
          renderItem={({ item }) => {
            return (
              <View style={isUser(item) ? styles.sender : styles.receiver}>
                <View style={isUser(item) ? styles.senderName : styles.receiverName}>
                  <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center' }}>{item.name}</Text>
                </View>
                <View style={isUser(item) ? styles.senderText : styles.receiverText}>
                  <Text style={{ fontSize: 18, color: 'white', flex: 1 }}>{item.message}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', }}>
                  <Text style={{
                    fontSize: 12, alignSelf: 'flex-end',
                    color: 'black', fontWeight: 'bold', paddingRight: 5
                  }}>
                    {formatTimestamp(item.timestamp)}</Text>

                </View>
              </View>
            );
          }}
        />
        
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }} >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'center' }}>
            <TextInput style={{
              borderRadius: 10, borderWidth: 1,
              padding: 3, marginLeft: 5, marginBottom: 5, backgroundColor: '#D3F4FB',
              borderColor: '#00B6BC'
              , shadowColor: 'black', elevation: 10
            }}
              value={data} onChangeText={(t) => { setData(t) }} />
          </View>

          <View style={{ justifyContent: 'flex-end', marginBottom: 10, marginRight: 10 }}>
            <TouchableOpacity onPress={sendMessage}>
              <MaterialIcons style={{ alignSelf: 'flex-end' }} name="send" size={30} color="black" />
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View >
  )
}

const styles = StyleSheet.create({
  sender: {
    alignSelf: 'flex-end',
  },
  receiver: {
    alignSelf: 'flex-start'
  },
  senderName: {
    backgroundColor: "#050A30",
    paddingLeft: 8, paddingRight: 8,//width:120,
    borderTopLeftRadius: 10,
    marginRight: 5,
    alignSelf: 'flex-end',
    alignItems: 'baseline'
  },
  receiverName: {
    backgroundColor: "#050A30",
    borderTopRightRadius: 10,
    marginLeft: 5,
    paddingLeft: 8, paddingRight: 8,
    alignItems: 'baseline',
    alignSelf: 'flex-start',
  },
  senderText: {
    backgroundColor: "#000075",
    padding: 10, marginBottom: 10, marginRight: 5, width: 200,
    borderTopLeftRadius: 10, flexDirection: 'row',

  },
  receiverText: {
    backgroundColor: "#000075",
    padding: 10, marginBottom: 10, marginLeft: 5, width: 200,
    borderTopRightRadius: 10, flexDirection: 'row'
  }
})
