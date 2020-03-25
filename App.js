import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import Navigator from './navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from './data/store'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import { Root } from "native-base"


const App = () => {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })  
    }
    loadFont().then(() => setIsReady(true))
  }, [])
  if (!isReady) return <AppLoading />
  return (
    <Store>
      <SafeAreaProvider>
        <Root>
          <Navigator />
        </Root>
      </SafeAreaProvider>
    </Store>
  )
  
}

export default App