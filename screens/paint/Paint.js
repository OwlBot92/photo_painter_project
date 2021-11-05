import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library'
import { TouchableOpacity } from "react-native-gesture-handler";

import UndoIcon from '../../assets/icons/undo.png';
import SaveIcone from '../../assets/icons/save.png';


const Paint = (props) => {
    //console.log(props);
    //console.log('PROPS STUFF', props.route.params.photoInfo);

    const arrayColors = [
        'red',
        'blue',
        'green',
        'black',
        'pink',
        'teal',
        'purple',
        'orange',
    ]

    const arrayPenSizes = [
        5, 10, 20, 30, 40
    ]

    /* possible dimensions */
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('screen').height;
    const screenWidth = Dimensions.get('screen').width;
    const imgWidth = 400;
    const imgHeight = 600;


    const [state, setState] = useState({
        signature: null,
        img64: null,
        coloreState: 'black'
    })

    const ref = useRef();


    useEffect(() => {
        setState({
            ...state,
            img64: 'data:image/png;base64,' + props.route.params.photoInfo
        })
    }, [])

    const handleOK = (signature) => {
        setState({
            ...state,
            signature: signature,
        })
        const path = FileSystem.cacheDirectory + "sign.png";
        FileSystem.writeAsStringAsync(path, signature.replace("data:image/png;base64,", ""), { encoding: FileSystem.EncodingType.Base64 })
            .then(() => FileSystem.getInfoAsync(path))
            .then(() => SaveToPhone(path))
            .then(console.log(path))
            .catch(console.error);
    };

    const SaveToPhone = async (item) => {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
            try {
                const asset = await MediaLibrary.createAssetAsync(item)
                MediaLibrary.createAlbumAsync('Images', asset, false)
                    .then(() => {
                        console.log('File Saved Successfully!');
                    })
                    .catch(() => {
                        console.log('Error In Saving File!');
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Need Storage permission to save file');
        }
    };


    const style = `
            .m-signature-pad--body canvas {
                border-radius: 0px;
            }
            .m-signature-pad {box-shadow: none; border: none; } 
            .m-signature-pad--body {
                border: 10px solid white;
                border-radius: 0;
            }

            body,html {
            width: ${windowWidth}px; height: ${windowHeight}px;}
            .m-signature-pad--footer{
                height: 50px; 
                background-color: transparent;
                position: absolute;
                bottom: 0;
                width: 100%;
            }
            .m-signature-pad--footer .description {
                display: none;
            }
            .m-signature-pad--footer .button {
                display: none;
                background-color: teal;
                color: white;
            }`;

    const changeColor = (colore) => () => {
        let coloreState = '';
        switch (colore) {
            case 'green':
                coloreState = 'green'
                ref.current.changePenColor('green');
                break;
            case 'blue':
                coloreState = 'blue'
                ref.current.changePenColor('blue');
                break;
            case 'red':
                coloreState = 'red'
                ref.current.changePenColor('red');
                break;
            case 'purple':
                coloreState = 'purple'
                ref.current.changePenColor('purple');
                break;
            case 'teal':
                coloreState = 'teal'
                ref.current.changePenColor('teal');
                break;
            case 'pink':
                coloreState = 'pink'
                ref.current.changePenColor('pink');
                break;
            case 'orange':
                coloreState = 'orange'
                ref.current.changePenColor('orange');
                break;
            case 'black':
                coloreState = 'black'
                ref.current.changePenColor('black');
                break;
            default:
                break;
        }
        setState({
            ...state,
            coloreState
        })
    }

    const changeSize = (size) => () => {
        ref.current.changePenSize(size / 4, size / 1.5)
    }
    const clearSignatureOnly = () => {
        ref.current.undo()
    }

    const saveFile = () => {
        ref.current.readSignature();
    }

    return (
        <>
            {
                state.img64 !== null &&
                <View style={{ flex: 1 }}>
                    {/* PENNINO */}
                    <View style={{
                        paddingTop: 15,
                        paddingBottom: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 20,
                        borderBottomWidth: 2,
                        borderBottomColor: 'black',
                        backgroundColor: 'white'
                    }}>
                        {
                            arrayPenSizes.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={changeSize(item)}
                                        style={{
                                            height: item,
                                            width: item,
                                            backgroundColor: state.coloreState,
                                            borderRadius: 50,
                                            marginRight: 20
                                        }}>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    {
                        state.img64 !== null &&
                        <SignatureScreen
                            ref={ref}
                            backgroundColor='white'
                            /* bgSrc={"https://via.placeholder.com/300x200/ff726b"} */
                            dataURL={state.img64}
                            penColor={'black'}
                            bgWidth={windowWidth}
                            bgHeight={windowHeight}
                            //clearText="Clear"
                            confirmText="Save"
                            webStyle={style}
                            onOK={handleOK}
                        />
                    }
                    {
                        state.img64 === null &&
                        <SignatureScreen
                            ref={ref}
                            backgroundColor='white'
                            /* bgSrc={"https://via.placeholder.com/300x200/ff726b"} */
                            //dataURL={state.img64}
                            penColor={'black'}
                            bgWidth={windowWidth}
                            bgHeight={windowHeight}
                            //clearText="Clear"
                            confirmText="Save"
                            webStyle={style}
                            onOK={handleOK}
                        />
                    }
                    <View style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        backgroundColor: 'white',
                        borderTopColor: 'black',
                        borderTopWidth: 2,
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}>

                        <TouchableOpacity
                            onPress={clearSignatureOnly}
                            style={{
                                height: 55,
                                width: 55,
                                borderRadius: 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 5,
                                backgroundColor: "rgba(0,0,0,0.3)",
                            }}
                        >
                            <Image
                                source={UndoIcon}
                                style={{
                                    width: 35,
                                    height: 35
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={saveFile}
                            style={{
                                height: 55,
                                width: 55,
                                borderRadius: 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 5,
                                backgroundColor: "rgba(0,0,0,0.3)"
                            }}
                        >
                            <Image
                                source={SaveIcone}
                                style={{
                                    width: 35,
                                    height: 35
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* PALETTE */}
                    <View style={{ display: 'flex', flexDirection: "row", backgroundColor: 'black' }}>
                        {
                            arrayColors.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={changeColor(item)}
                                        style={{
                                            width: 45,
                                            height: 45,
                                            backgroundColor: item
                                        }}
                                    >
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            }
        </>
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


export default Paint