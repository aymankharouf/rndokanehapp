import React, { useState } from 'react';
import { Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../data/firebase'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const About = props => {
  const [name, setName] = useState('')
  const onPress = () => {
    Keyboard.dismiss()
    const newCategoryRef = firebase.database().ref('categories').push()
    newCategoryRef.set({name})
    Toast.show({
      text: "added",
      buttonText: "Ok",
      type: "success",
      duration: 3000
    })
    props.navigation.goBack()
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <Form>
          <Item fixedLabel>
            <Label>Username</Label>
            <Input onChange={e => setName(e.nativeEvent.text)} />
          </Item>
        </Form>
        <Button block onPress={onPress}>
          <Text>submit</Text>
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default About