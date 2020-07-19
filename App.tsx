 
import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import { Root } from "native-base"
import Store from './data/store'
import {UIManager, I18nManager} from 'react-native'

//UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
//I18nManager.allowRTL(true)
//I18nManager.forceLTR(true)

const App = () => {
  const [isReady, setIsReady] = React.useState(false)
  React.useEffect(() => {
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