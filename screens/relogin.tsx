import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'
import labels from '../data/labels'
import { Link } from '@react-navigation/native'

const Relogin = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Link to="/login">{labels.relogin}</Link>
    </SafeAreaView>
  )
  
}

export default Relogin