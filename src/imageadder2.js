import { View, Text, Button, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, firebase, blob, } from "firebase/storage";

//import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../App';
export const Imageadder2 = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    let newImageUri
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            //console.log(result.assets[0].uri)
            //const ref=ref(storage,'images.jpg')

        }
    };
    const downloadImage = async () => {
        // const blob = await new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.onload = function() {
        //       resolve(xhr.response);
        //     };
        //     xhr.onerror = function() {
        //       reject(new TypeError('Network request failed'));
        //     };
        //     xhr.responseType = 'blob';
        //     xhr.open('GET', image, true);
        //     xhr.send(null);
        //   })
        //   const ref = firebase.storage().ref().child(`Pictures/Image1`)
        //   const snapshot = ref.put(blob)
        //   snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        //     ()=>{
        //       setUploading(true)
        //     },
        //     (error) => {
        //       setUploading(false)
        //       console.log(error)
        //       blob.close()
        //       return 
        //     },
        //     () => {
        //       snapshot.snapshot.ref.getDownloadURL().then((url) => {
        //         setUploading(false)
        //         console.log("Download URL: ", url)
        //         setImage(url)
        //         blob.close()
        //         return url
        //       })
        //     }
        //     )
        // const storage = getStorage();
        const metadata = {
            contentType: 'image/jpeg',
          };
        const storageRef = ref(storage, 'images/rivers.jpg');

        const uploadTask = uploadBytes(storageRef, image, metadata);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    }
    return (
        <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />}
            <Button title='Select Image' onPress={pickImage} />
            {!uploading ? <Button title='Upload Image' onPress={downloadImage} /> : <ActivityIndicator size={'small'} color='black' />}
        </View>

        // <View style={{ paddingTop: 100 }}>
        //     <View >
        //         <Button title='upload image ' onPress={() => { { pickImage() } }} />
        //         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        //     </View>
        //     <View style={{ paddingTop: 100 }}>
        //         <Button title='downoad image ' onPress={() => { { downloadImage() } }} />
        //         {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        //     </View>
        //     {/* {console.log(image)} */}
        // </View>
    )
}

