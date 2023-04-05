
import { View, Text, Button, Image, PermissionsAndroid, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from '../App';
import { db, addDoc, collection, auth } from '../App';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const Detailcamerasetup = ({ route, navigation }) => {
  
  const { itemId } = route.params;
  //console.log(chatId);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [save, setSave] = useState(false)
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri)
      setImage(data.uri)
      //uploadImage();
     
      //const storage = getStorage();

    }
  }

  async function uploadImage() {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, `gauravgupta/${Date.now()}`);
    uploadTask = await uploadBytesResumable(storageRef, blob);
    url = await getDownloadURL(storageRef)
    console.log(url)
    showimage();

  }

  const uploadimage = async () => {
    //setModalVisible(false)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);

      //uploadImage();
      //const storage = getStorage();
      // async function uploadImage() {
      //   const response = await fetch(image);
      //   const blob = await response.blob();
      //   const storageRef = ref(storage, `gaurav/${Date.now()}`);
      //   uploadTask = await uploadBytesResumable(storageRef, blob);
      //   url = await getDownloadURL(storageRef)
      //   console.log(url)
      //   showimage();

      // }
    }

  }

  const frankDocRef = doc(db, "users", `${itemId}`);

  const showimage = async () => {
    try {
      const docRef =await updateDoc(frankDocRef, {
        DailyProfileUrl: url,
    });
      
        //message: data,
       // uid: auth.currentUser.uid,
        //email: auth.currentUser.email,
        //name: auth.currentUser.displayName,
        //timestamp: serverTimestamp(),
        
      
      //setData('')
      //setPress(false);
      //listViewref.scrollToEnd({animated:true})

      //console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (

    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={'1:1'}
        />
        <TouchableOpacity  onPress={()=>{navigation.goBack()}}
        style={{ position: 'absolute', alignSelf: 'flex-start', padding: 10 }}>
          <Ionicons name="arrow-back-sharp" size={40} color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10, backgroundColor: "grey", flex: .6 }}>
        {image ?
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Image source={{ uri: image }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => { uploadImage() }}
              style={{ position: 'absolute', alignSelf: 'flex-end', padding: 10 }}>
              <FontAwesome5 name="check" size={30} color="white"
              />
            </TouchableOpacity>
          </View>
          : <Image
            style={{ flex: 1 }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6bgYW4I_DlJ9KzN5956gO6MVCRjwuk4Y5Q&usqp=CAU',
            }}
          />}
      </View>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between'
        , backgroundColor: 'grey', paddingLeft: 20, paddingRight: 20,
      }}>
        <View style={{ borderRadius: 40, backgroundColor: 'white', borderWidth: 1 }}>
          <TouchableOpacity
            style={styles.button}

            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons name="camera-flip" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ borderRadius: 40, backgroundColor: 'white', borderWidth: 1 }}>
          <TouchableOpacity style={{ alignSelf: 'center', padding: 20 }} onPress={() => takePicture()} >
            <FontAwesome name="picture-o" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ borderRadius: 40, backgroundColor: 'white', borderWidth: 1 }}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 20 }} onPress={() => uploadimage()} >
            <MaterialCommunityIcons name="view-gallery" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,

  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    flex: 1,
    padding: 20
  },
});
