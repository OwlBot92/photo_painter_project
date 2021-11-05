import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from './screens/welcome/Welcome';
import Paint from './screens/paint/Paint';
import CameraScreen from './screens/cameraScreen/CameraScreen';

const EntryApp = (props) => {
    const Stack = createStackNavigator();

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={props.root}
                    screenOptions={{
                        /* headerMode: 'none', */
                        gestureEnabled: false,
                    }}>

                    <Stack.Screen
                        options={
                            {
                                title: 'Photo Cat'
                            }
                        }
                        name='Welcome'
                        component={Welcome}
                    />
                    <Stack.Screen
                        options={
                            {
                                title: 'Paint!',
                                headerStyle: {
                                    backgroundColor: 'teal'
                                },
                                headerTintColor: '#fff',
                            }
                        }
                        name='Paint'
                        component={Paint}
                    />
                    <Stack.Screen
                        options={
                            {
                                title: 'Camera',
                                headerStyle: {
                                    backgroundColor: 'teal'
                                },
                                headerTintColor: '#fff',
                            }
                        }
                        name='CameraScreen'
                        component={CameraScreen}
                    />

                </Stack.Navigator>
            </NavigationContainer>

        </SafeAreaView>
    );
}


export default EntryApp;