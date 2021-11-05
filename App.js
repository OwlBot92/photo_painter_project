
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
//Hooks
import React, { useState, useEffect } from 'react'
//for permissions
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

//entry
import EntryApp from './EntryApp';

const App = () => {


  const [state, setState] = useState({
    cameraPermission: false,
    mediaPermission: false,
    root: 'Welcome'
  })

  const checkPermissions = async () => {
    const cameraPermission = await Camera.requestPermissionsAsync();
    const mediaPermission = await MediaLibrary.requestPermissionsAsync();
    setState({
      ...state,
      cameraPermission: cameraPermission.status === 'granted',
      mediaPermission: mediaPermission.status === 'granted',
    })
  }

  useEffect(() => {
    checkPermissions();
  }, [])

  return (
    <SafeAreaView  style={{flex: 1}}>
      {
        (!state.cameraPermission || !state.mediaPermission) &&
        <ActivityIndicator />
      }

      {
        state.cameraPermission && state.mediaPermission &&
        <EntryApp root={state.root} />
      }
      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}



export default App;