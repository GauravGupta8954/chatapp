import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'

export  function FaceDetection({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([])
  const[camera,setCamera]=useState(null)
  const [faceData,setFacedata]=useState([])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri)
      //setImage(data.uri)
      //uploadImage();
      navigation.goBack();
      //const storage = getStorage();
      
    }
  }

  function getFaceDataView() {
    if (faceData.length === 0) {
      alert("no face detected")
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces :</Text>
        </View>
      );
    } else {
      // return faceData.map((face, index) => {
      //   const eyesShut = face.rightEyeOpenProbability < 0.5 && face.leftEyeOpenProbability < 0.5;
      //   const winking = !eyesShut && (face.rightEyeOpenProbability < 0.5 || face.leftEyeOpenProbability < 0.5);
      //   const smiling = face.smilingProbability > 0.8;
      //   return (
      //     <View style={styles.faces} key={index}>
      //       <Text style={styles.faceDesc}>Eyes Shut: {eyesShut.toString()}</Text>
      //       <Text style={styles.faceDesc}>Winking: {winking.toString()}</Text>
      //       <Text style={styles.faceDesc}>Smiling: {smiling.toString()}</Text>
      //     </View>
      //   );
      // });
    takePicture();
    }
  }

  const faceDetected = ({faces}) => {
    setFaces(faces) // instead of setFaces({faces})
    console.log({faces})
    //console.log("$$$$$$$$$$$$$$$$$$$$$$$$")
    setFacedata(faces)
    //console.log(faceData)
   // console.log("%%%%%%%%%%%%%555%%%%%%%%%%")
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={{flex:1}}>
      <Camera
      ref={ref => setCamera(ref)}
        style={{ flex: 1,alignItems: 'center',
        justifyContent: 'center', }}
        type='front'
        onFacesDetected = {faceDetected}
        FaceDetectorSettings = {{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 10000,
          tracking: true
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          {faces[0] && <Text style= {{top:200}}> is {faces[0].rollAngle} </Text>} 
        </View>
        {/* {getFaceDataView()} */}
      </Camera>
      <TouchableOpacity style={{justifyContent:'flex-start',alignItems:'center',flex:0.3}} 
      onPress={()=>{getFaceDataView()}} >
      <Text style={{fontSize:29,color:'red'}}>ok</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faces: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  faceDesc: {
    fontSize: 50
  }
});