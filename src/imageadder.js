import { View, Text, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL ,uploadBytes} from "firebase/storage";
import { storage } from '../App';


export const Imageadder = () => {
    const [image, setImage] = useState(null);
    //const storage = getStorage();
    const metadata = {
        contentType: 'image/jpg'
    };
    useEffect(() => {
    const storageRef = ref(storage, 'kuch/xyz.jpg');
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        uploadimage = async () => {
            uploadTask.on('state_changed',
                (snapshot) => {
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
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );
        }
        if (image != null) {
            uploadimage();
           // setImage(null)
        }
    }, [image])
   
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
    downloadImage = () => {
        // const storageRef = ref(storage, 'images.png');

        // // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, image).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // }).catch((error)=>{
        //  console.log(error.message);
        // });
       

    }

    return (
        <View style={{ paddingTop: 100 }}>
            <View >
                <Button title='upload image ' onPress={() => { { pickImage() } }} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <View style={{ paddingTop: 100 }}>
                <Button title='downoad image ' onPress={() => { { downloadImage() } }} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            {/* {console.log(image)} */}
        </View>
    )
}

