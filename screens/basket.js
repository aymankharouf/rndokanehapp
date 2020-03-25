import React, { useState } from 'react';
import { Form, Item, Input, Label, Button, Text, Toast, Content } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../data/firebase'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import BottomToolbar from './bottom-toolbar'

const Basket = props => {
  const [name, setName] = useState('')
  const onPress = () => {
    Keyboard.dismiss()
    /*const newKey = firebase.database().ref().child('categories').push().key
    let updates = {}
    updates['/categories/' + newKey] = {name}
    firebase.database().ref().update(updates)*/
    const newCategoryRef = firebase.database().ref('categories').push()
    newCategoryRef.set({name})
    Toast.show({
      text: "added",
      buttonText: "Okay",
      type: "success",
      duration: 3000
    })
    props.navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input onChange={e => setName(e.nativeEvent.text)} />
            </Item>
          </Form>
          <Button block onPress={onPress}>
            <Text>submit</Text>
          </Button>
        </Content>
        <BottomToolbar />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Basket