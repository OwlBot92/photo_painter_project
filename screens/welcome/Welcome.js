import React from "react";


import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import LottieView from 'lottie-react-native';
import PhotoLottie from '../../assets/lottie/45744-shooting-photo-animation.json';
import CatLottie from '../../assets/lottie/75212-cat-loader.json'

import PhotoIcon from '../../assets/icons/camera.png'
import BrushIcon from '../../assets/icons/brush.png'

const Welcome = (props) => {


    const goCamera = () => {
        props.navigation.navigate('CameraScreen')
    }   

    const goPaint = () => {
        props.navigation.navigate('Paint', {})
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: 'black', }}>
                {/* <Text style={{ color: 'teal', paddingLeft: 30, paddingTop: 20, paddingBottom: 20 }}>logo</Text> */}
            </View>

            {/* {<StatusBar style="auto" />} */}
            <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center'
            }}>
                <LottieView
                    autoPlay
                    style={{
                        width: 300
                    }}
                    source={CatLottie}
                />
            </View>


            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-around",
                marginBottom: 20,
                marginLeft: 40,
                marginRight: 40,
            }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goCamera}
                >
                    <Image 
                        source={PhotoIcon}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                    {/* <Text style={styles.textStyle}>Take Picture</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={goPaint}
                >
                    <Image 
                        source={BrushIcon}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                    {/* <Text style={styles.textStyle}>Free Paint</Text> */}
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

/* STYLE */
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'space-between',
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 15,
        marginTop: 20,
        borderRadius: 25,
        fontWeight: 'bold',
    },
    btnText: {
        fontWeight: 'bold'
    }
});
export default Welcome;