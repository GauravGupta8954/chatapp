
import { View, Text, Button, Image,PermissionsAndroid ,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL ,uploadBytes} from "firebase/storage";
import { storage } from '../App';
import { db, addDoc, collection, auth } from '../App';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export const Camerasetup = ({route}) => {
  const { chatId } = route.params;
  console.log(chatId);
  const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const  galleryStatus  = await   ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted')
})();
  }, []);
  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      console.log(data.uri)
      setImage(data.uri)
      
      uploadImage();
      //const storage = getStorage();
      async function uploadImage() {
        const response = await fetch(data.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `gaurav/${Date.now()}`);
        uploadTask = await uploadBytesResumable(storageRef, blob);
        url = await getDownloadURL(storageRef)
        console.log(url)
        showimage();

      }
    }
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
      uploadImage();
      //const storage = getStorage();
      async function uploadImage() {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `gaurav/${Date.now()}`);
        uploadTask = await uploadBytesResumable(storageRef, blob);
        url = await getDownloadURL(storageRef)
        console.log(url)
        showimage();

      }
    }

  }

  const showimage = async () => {
    try {
      const docRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
        //message: data,
        uid: auth.currentUser.uid,
        //email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
        imageUrl: url,
      });
      //setData('')
      //setPress(false);
      //listViewref.scrollToEnd({animated:true})

      console.log("Document written with ID: ", docRef.id);

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
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity
        style={styles.button}
        
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
            <MaterialCommunityIcons name="camera-flip-outline" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity style={{alignSelf:'center', padding:20}}  onPress={() => takePicture()} >
      <FontAwesome name="picture-o" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity  style={{alignSelf:'flex-end', padding:20}}onPress={() => uploadimage()} >
      <MaterialCommunityIcons name="view-gallery" size={24} color="black" />
      </TouchableOpacity>
      
      </View>
      {image && <Image source={{uri: image}} style={{flex:1}} />}
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
    flexDirection: 'row'
  },
  button: {
    //flex: 1,
    padding:20
  },
});
