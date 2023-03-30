import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { db, collection } from '../App';
import { onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
//import firestore from '@react-native-firebase/firestore';
export const Chatlist = () => {
    const ref = collection(db, 'chats')
    const [user, setUser] = useState([]);
    const navigation = useNavigation()

    addchat=()=>{
        firestore()
        .collection('chats')
        .add({
          chatName: 'Ada Lovelace',
          
        })
        .then(() => {
          console.log('User added!');
        }); 
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                const { timestamp, chatName } = doc.data();
                user.push({
                    id: doc.id,
                    chatName,
                    timestamp
                });
            });
            setUser(user)
            // console.log(user[0].chatName)
        })
        return () => unsubscribe();
    }, []);
    return (
        <View style={{ paddingTop: 10}}>
            <View>
                <Text style={{
                    fontSize: 25, fontWeight: 'bold', alignSelf: 'center',
                    padding: 10
                }}>Chat's List </Text>
            </View>
            <FlatList
                data={user}
                //keyExtractor={item=item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', {
                                item
                            })} >
                                <View style={{
                                    alignItems: 'center', backgroundColor: "lightgreen",
                                    padding: 5, margin: 10, width: 250, borderRadius: 15,
                                    shadowColor: 'blue', elevation: 20
                                }}>
                                    <Text style={{ fontSize: 22 }}>{item.chatName}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    );
                }}
            />
            <View style={{ alignItems: "baseline", alignItems: 'center',paddingTop:100 }}>
                <TouchableOpacity style={{
                    borderRadius: 10, borderWidth: 1,
                    backgroundColor: '#A1DBF1',
                    padding: 10, margin: 10
                }}
                    onPress={() => { addchat() }}>
                    <Text style={{
                        fontSize: 20, alignContent: 'center', alignItems: 'center',
                        fontWeight: 'bold'
                    }}>Want to create New chat!</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "baseline", alignItems: 'center',paddingTop:100 }}>
                <TouchableOpacity style={{
                    borderRadius: 10, borderWidth: 1,
                    backgroundColor: '#A1DBF1',
                    padding: 10, margin: 10
                }}
                    onPress={() => { navigation.navigate("imageadder") }}>
                    <Text style={{
                        fontSize: 20, alignContent: 'center', alignItems: 'center',
                        fontWeight: 'bold'
                    }}>image</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "baseline", alignItems: 'center',paddingTop:100 }}>
                <TouchableOpacity style={{
                    borderRadius: 10, borderWidth: 1,
                    backgroundColor: '#A1DBF1',
                    padding: 10, margin: 10
                }}
                    onPress={() => { navigation.navigate("imageadder2") }}>
                    <Text style={{
                        fontSize: 20, alignContent: 'center', alignItems: 'center',
                        fontWeight: 'bold'
                    }}>image2</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

