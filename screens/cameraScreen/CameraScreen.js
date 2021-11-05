import React, { useRef, useState, useEffect } from 'react'

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { View, Text, StyleSheet, Button, Dimensions, Image, TouchableOpacity } from "react-native";

import { useFocusEffect } from '@react-navigation/core';
import CircleIcon from '../../assets/icons/button.png';
import RotateCamera from '../../assets/icons/rotation.png';



const CameraScreen = (props) => {

    const screenHeight = Dimensions.get('screen').height;
    const screenWidth = Dimensions.get('screen').width;
    let globalCamera = useRef(null);

    const [state, setState] = useState({
        openCamera: true,
        typeCamera: Camera.Constants.Type.back,
        img: null,
    })


    useFocusEffect(() => {
        if (!state.openCamera) {
            setState({ ...state, openCamera: true })
        }
    });


    const setCameraType = () => {
        let cameraBack = Camera.Constants.Type.back;
        let cameraFront = Camera.Constants.Type.front;

        setState({
            ...state,
            typeCamera: state.typeCamera === cameraBack ? cameraFront : cameraBack,
        })
    }

    const takePicture = async () => {
        console.log('taking picture');
        if (globalCamera) {
            const { uri, base64 } = await globalCamera.current.takePictureAsync({ base64: true, quality: 0.1 });
            const asset = await MediaLibrary.createAssetAsync(uri);

            console.log('picture taken!');

            console.log('closing camera');
            falsifyCamera();

            console.log('changing page');
            goPaint(base64)


        }
    }
    const falsifyCamera = () => {
        setState({
            ...state,
            openCamera: false,
        })
    }

    const goPaint = (photoData) => {
        props.navigation.navigate('Paint', { photoInfo: photoData })
    }
    return (
        <View style={{ flex: 1 }}>

            {
                state.openCamera &&
                <>
                    <Camera
                        style={{ width: screenWidth, height: screenHeight, position: 'relative' }}
                        type={state.typeCamera}
                        ref={globalCamera}
                    >
                    </Camera>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        bottom: 50,
                        width: screenWidth
                    }}>
                        <TouchableOpacity
                            style={styles.touchableOpStyle}
                            onPress={takePicture}
                        >
                            <Image
                                source={CircleIcon}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                            />

                            {/* <Text style={{
                                fontWeight: 'bold'
                            }}>SNAP</Text> */}
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        style={{ position: 'absolute', top: 30, right: 30, padding: 10, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.2)"}}
                        onPress={setCameraType}
                    >
                        <Image
                            source={RotateCamera}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </TouchableOpacity>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    touchableOpStyle: {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 50,
        color: 'black',
        padding: 10,
    },
})

export default CameraScreen