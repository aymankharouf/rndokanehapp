import React, { useContext } from 'react'
import { FlatList, Alert } from 'react-native'
import { ListItem, Text, Left, Right, Icon, Fab, Toast } from 'native-base'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Row, Grid } from 'react-native-easy-grid'
import BottomToolbar from './bottom-toolbar'
import { deleteCategory } from '../data/actions'
import MainCategories from './main-categories'

const Home = props => {
  const { state } = useContext(StoreContext)
  const handleNavigate = () => {
    props.navigation.push('About')
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainCategories />
      <BottomToolbar />
    </SafeAreaView>
  )
}

export default Home