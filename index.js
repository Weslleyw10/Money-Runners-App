import React from "react"
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { colors } from './src/data/theme.json'

import store from './src/store'

import {
    useFonts,
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';


import Routes from './src/routes'

const App = () => {
    let [fontsLoaded] = useFonts({
        Ubuntu_300Light,
        Ubuntu_300Light_Italic,
        Ubuntu_400Regular,
        Ubuntu_400Regular_Italic,
        Ubuntu_500Medium,
        Ubuntu_500Medium_Italic,
        Ubuntu_700Bold,
        Ubuntu_700Bold_Italic,
    });

    if (!fontsLoaded) { return null }

    return (
        <StoreProvider store={store}>
            <ThemeProvider theme={colors}>
                <PaperProvider>
                    <Routes />
                </PaperProvider>
            </ThemeProvider>
        </StoreProvider>
    )
}

registerRootComponent(App);