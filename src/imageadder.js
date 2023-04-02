import { View, Text, Button, Image,PermissionsAndroid ,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL ,uploadBytes} from "firebase/storage";
import { storage } from '../App';
import { db, addDoc, collection, auth } from '../App';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export const Imageadder = () => {
    const [image, setImage] = useState(null);
    const [cameraPermission, setCameraPermission] = useState();
    const [startCamera,setStartCamera] = useState(false);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    //let camera: Camera();
    //const storage = getStorage();
//     const { v } = route.params;
//   console.log(v.id);
//   const chatId = v.id
const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const metadata = {
        contentType: 'image/jpg'
    };
    // useEffect(() => {
    // const storageRef = ref(storage, 'kuch/xyz.jpg');
    // const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    //     uploadimage = async () => {
    //         uploadTask.on('state_changed',
    //             (snapshot) => {
    //                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                 console.log('Upload is ' + progress + '% done');
    //                 switch (snapshot.state) {
    //                     case 'paused':
    //                         console.log('Upload is paused');
    //                         break;
    //                     case 'running':
    //                         console.log('Upload is running');
    //                         break;
    //                 }
    //             },
    //             (error) => {
    //                 // A full list of error codes is available at
    //                 // https://firebase.google.com/docs/storage/web/handle-errors
    //                 switch (error.code) {
    //                     case 'storage/unauthorized':
    //                         // User doesn't have permission to access the object
    //                         break;
    //                     case 'storage/canceled':
    //                         // User canceled the upload
    //                         break;

    //                     // ...

    //                     case 'storage/unknown':
    //                         // Unknown error occurred, inspect error.serverResponse
    //                         break;
    //                 }
    //             },
    //             () => {
    //                 // Upload completed successfully, now we can get the download URL
    //                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                     console.log('File available at', downloadURL);
    //                 });
    //             }
    //         );
    //     }
    //     if (image != null) {
    //         uploadimage();
    //        // setImage(null)
    //     }
    // }, [image])
   
    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //      //console.log(result.assets[0].uri)
    //         //const ref=ref(storage,'images.jpg')

    //      }
    //  };

    useEffect(() => {
        (async () => {
          const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
          const  galleryStatus  = await   ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermission(galleryStatus.status === 'granted')
    })();
      }, []);

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
            //showimage();
    
          }
        }
    
      }

      const takePicture = async () => {
        if(camera){
          const data = await camera.takePictureAsync(null);
          console.log(data.uri)
          setImage(data.uri)
          
        }
      }

      if (hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
      const cameraImage = async () => {
       
        // try {
        //     const granteded = await PermissionsAndroid.request(
        //       PermissionsAndroid.PERMISSIONS.CAMERA,
        //       {
        //         title: 'Cool Photo App Camera Permission',
        //         message:
        //           'Cool Photo App needs access to your camera ' +
        //           'so you can take awesome pictures.',
        //         buttonNeutral: 'Ask Me Later',
        //         buttonNegative: 'Cancel',
        //         buttonPositive: 'OK',
        //       },
        //     );
        //     if (granteded === PermissionsAndroid.RESULTS.GRANTED) {
        //       console.log('You can use the camera');
        //       //console.log(granteded);
        //       const result = await ImagePicker.launchCameraAsync({
        //         allowsEditing: true,
        //         aspect: [1, 1],
        //         base64: true,
        //         quality: 0.5,
        //       })
          
        //       console.log(result);
          
        //       if (!result.canceled) {
        //         setImage(result.uri);
        //     }} else {
        //       console.log('Camera permission denied');
        //     }
        //   } catch (err) {
        //     console.warn(err);
        //   }
    //     const cameraPermission = await Camera.requestCameraPermissionsAsync();

    // setCameraPermission(cameraPermission.status === 'granted');
    //    console.log(cameraPermission);
        // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        // if (permissionResult.granted === false) {
        //   alert("You've refused to allow this appp to access your camera!");
        //   return;
        // }
       // setModalVisible(false)
    //   if (
        
    //     granteded !== 'granted'
    //   ) {
    //     alert('Permission for media access needed.');
    //   }
        
    
    //     console.log(result);
    
    //     if (!result.canceled) {
    //       setImage(result.uri);
    //       uploadImage();
    //       //const storage = getStorage();
    //       async function uploadImage() {
    //         const response = await fetch(result.uri);
    //         const blob = await response.blob();
    //         const storageRef = ref(storage, `gaurav/${Date.now()}`);
    //         uploadTask = await uploadBytesResumable(storageRef, blob);
    //         url = await getDownloadURL(storageRef)
    //         console.log(url)
    //         //showimage();
    
    //       }
    //     }
    
    }
    
    
    
      const showimage = async () => {
        try {
          const docRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
            //message: data,
            uid: auth.currentUser.uid,
            //email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            timestamp: serverTimestamp(),
            imageUrl: url
          });
          setData('')
          setPress(false);
          //listViewref.scrollToEnd({animated:true})
    
          console.log("Document written with ID: ", docRef.id);
    
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    

    return (
        // <View style={{ paddingTop: 100 }}>
        //     <View >
        //         <Button title='Gallery image ' onPress={() => { { uploadimage() } }} />
        //         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        //     </View>
        //     <View style={{ paddingTop: 100 }}>
        //         <Button title='camera image ' onPress={() => { { cameraImage() } }} />
        //         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        //     </View>
        //     {/* {console.log(image)} */}
        // </View>
        <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      <View style={{flexDirection:'row'}}>
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
      <TouchableOpacity  style={{alignSelf:'flex-end', padding:20}}onPress={() => pickImage()} >
      <MaterialCommunityIcons name="view-gallery" size={24} color="black" />
      </TouchableOpacity>
      
      </View>
      {image && <Image source={{uri: image}} style={{flex:1}} />}
      </View>
  );
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

