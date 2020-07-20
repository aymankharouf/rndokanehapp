 
import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from './data/store'
import {UIManager, I18nManager} from 'react-native'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
//I18nManager.allowRTL(true)
I18nManager.forceRTL(true)

const App = () => {
  return (
    <Store>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Store>
  )
  
}

export default App