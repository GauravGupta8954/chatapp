import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { db, getDocs, collection } from '../App';
import React, { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';


export const Listpage = ({navigation}) => {
    const [user, setUser] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const ref = collection(db, 'users')
    
    useEffect(() => {
        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                const { email, name } = doc.data();
                user.push({
                    id: doc.id,
                    email,
                    name
                });
            });
            setUser(user)
            //console.log(user)
        })
        return () => unsubscribe();
    }, []);
    
    
    // details = (id, name, email) => {
    //     id=id;name=name;email=email;
    //     return (
    //         <View style={styles.centeredView}>
    //             <Modal
    //                 animationType="slide"
    //                 transparent={true}
    //                 visible={modalVisible}>
    //                 <View style={styles.centeredView}>
    //                     <View style={styles.modalView}>
    //                     <Text>{name}</Text>
    //                         <Text>{email}</Text>
    //                         <Text>{id}</Text>
    //                         <Text>user.id</Text>
    //                         {console.log(name,id,email)}
    //                         {console.log(modalVisible)}
    //                         <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(false) }}>
    //                             <Text style={{ fontSize: 20, color: 'red' }}>ok</Text>
    //                             {console.log("Hi")}
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </Modal>
    //         </View>

    //     );
    // }

    return (
        <View style={{ paddingTop: 50 }}>
            <FlatList
                data={user}
                //keyExtractor={item=item.id}
                //ListFooterComponent={() => <Text>The End!</Text>}
                //initialScrollIndex={user.length - 1}
                
                
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("details",{item}) }}>
                                <View style={{
                                    alignItems: 'center', backgroundColor: "lightgreen",
                                    padding: 10, margin: 10, width: 250, borderRadius: 15, shadowColor: 'blue', elevation: 20
                                }}>
                                    <Text style={{ fontSize: 22 }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    );
                }}
            />

        </View>

    );
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, JSON.stringify(doc.data()));
    // });

};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    }
})


