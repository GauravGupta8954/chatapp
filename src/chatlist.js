import { View, Text, FlatList, TouchableOpacity ,TextInput, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react';
import { db, collection } from '../App';
import { onSnapshot,setDoc,addDoc,serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
//import firestore from '@react-native-firebase/firestore';
export const Chatlist = () => {
    const ref = collection(db, 'chats')
    const [user, setUser] = useState([]);
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const addchat = async () => {
        //const myDocumentId = "749823_89723608765";
        //const documentRef = doc(db, 'chat_driver', chatId);
       setModalVisible(false)
        const docRef = collection(db, 'chats')
        const documentData = {
            chatName: value,
            timestamp: serverTimestamp(),
              
        };

        addDoc(docRef, documentData)
            .then(() => {
                
                 console.log('Document added successfully');
                
            })
            .catch((error) => {
                console.log('Error adding document:', error);
            });
            setValue('')
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
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', {item })} >
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
                    onPress={() => { setModalVisible(true) }}>
                    <Text style={{
                        fontSize: 20, alignContent: 'center', alignItems: 'center',
                        fontWeight: 'bold'
                    }}>Want to create New chat!</Text>
                </TouchableOpacity>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={{}}>
                      <Text style={{ textAlign: "center",  }}>Enter Chat Name</Text>
                     

                      <TextInput style={{ borderWidth: 1, padding: 10, margin: 10, backgroundColor: 'white' }}
                        placeholder='Enter Chat Name'  value={value} onChangeText={(t) => { 
                          setError(null)
                          setValue(t) }} />
                    </View>
                    {error!=="" && <Text style={{textAlign:'center',color:'red'}} >{error}</Text>}
                    <View style={{ flexDirection: 'row', paddingTop: 15, alignSelf: 'flex-end', }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          padding: 10, alignSelf: 'flex-end',
                          elevation: 2, backgroundColor: '#E43D40', marginRight: 10
                        }}
                        onPress={() => {
                          setError(null)
                          setValue(null)
                          setModalVisible(!modalVisible)
                          }}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          padding: 10, alignSelf: 'flex-end',
                          elevation: 2, backgroundColor: '#0C8A7B',
                          marginRight: 11
                        }}
                        onPress={() => {
                          if (!value){
                            setError("Please Fill Something!")
                          }
                          else { addchat() }
                        }}>
                        <Text style={styles.textStyle}>Ok</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* <View style={{ alignItems: "baseline", alignItems: 'center',paddingTop:100 }}>
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
            </View> */}
            {/* <View style={{ alignItems: "baseline", alignItems: 'center',paddingTop:100 }}>
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
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
   
      centeredView: {
        flex: 1,
        // position:"absolute",
        // bottom:"50%",
        justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 10,
        marginLeft: "5%",
        marginRight: "5%",
      },
      modalView: {
        margin: "5%",
        backgroundColor: "#F4F8FB",
        //borderRadius: 20,
        padding: "5%",
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 5,
        padding: "3%",
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#E43D40',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        paddingLeft: "5%",
        paddingRight: "5%"
      },
      modalText: {
        marginBottom: "10%",
        textAlign: 'center',
      },
    
  });