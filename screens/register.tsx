import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StoreContext } from '../data/store'
import { register, getMessage } from '../data/actions'
import labels from '../data/labels'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import RNToast from './rntoast'
import { TextField, FloatingButton } from 'react-native-ui-lib'

const Register = (props: any) => {
  const { dispatch } = React.useContext(StoreContext)
  const [password, setPassword] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [name, setName] = React.useState('')
  const [storeName, setStoreName] = React.useState('')
  const [isValid, setIsValid] = React.useState(false)
  React.useEffect(() => {
    setIsValid(mobile && password ? true : false)
  }, [mobile, password])
  const handleSubmit = async () => {
    try{
      await register(mobile, name, storeName, password)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.loginSuccess}})
      props.navigation.navigate('Home')
    } catch(err) {
      dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
		}
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.mobile}
          onChangeText={(e: string) => setMobile(e)}
          floatOnFocus
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.name}
          onChangeText={(e: string) => setName(e)}
          floatOnFocus
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.storeName}
          onChangeText={(e: string) => setStoreName(e)}
          floatOnFocus
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.password}
          onChangeText={(e: string) => setPassword(e)}
          floatOnFocus
        />
        <FloatingButton
          visible={isValid}
          button={{
            label: labels.login, 
            onPress: () => handleSubmit(), 
            labelStyle: {fontWeight: '400'}
          }}
        />
        <RNToast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Register