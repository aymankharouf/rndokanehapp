import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainCategories from './main-categories'

const Home = (props: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainCategories />
    </SafeAreaView>
  )
}

export default Home