import React, { useContext } from 'react'
import { FlatList, Alert } from 'react-native'
import { ListItem, Text, Left, Right, Icon, Fab, Toast } from 'native-base'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Row, Grid } from 'react-native-easy-grid'
import firebase from '../data/firebase'
import BottomToolbar from './bottom-toolbar'

const Home = props => {
  const { state } = useContext(StoreContext)
  const renderItem = ({ item }) => {
    return (
      <ListItem>
        <Left>
          <Text>{item.name}</Text>
        </Left>
        <Right>
          <Icon name="ios-close-circle" onPress={() => handleDelete(item.id)} style={{fontSize: 20, color: 'red'}}/>
        </Right>
      </ListItem>
    )
  }
  const deleteItem = id => {
    firebase.database().ref('categories/' + id).remove()
    Toast.show({
      text: "deleted",
      buttonText: "Ok",
      type: "success",
      duration: 3000
    })
  }
  const handleDelete = id => {
    Alert.alert(
      'Delete Confirmation',
      'Delete the selected item, Are you sure?',
      [
        {text: 'Yes', onPress: () => deleteItem(id)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
    );
  }
  const handleNavigate = () => {
    props.navigation.push('About')
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <Grid>
        <Row style={{height: 50, marginTop: -50}}>
          <Fab position="topRight" onPress={handleNavigate}><Icon name="add" /></Fab>
        </Row>
        <Row>
          {state.categories.length === 0 ?
            <Text>{labels.noData}</Text>
          : <FlatList 
              data={state.categories} 
              renderItem={renderItem} 
              keyExtractor={item => item.id}
            />
          }
        </Row>
      </Grid>
      <BottomToolbar />
    </SafeAreaView>
  )
}

export default Home