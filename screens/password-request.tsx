import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import RNToast from './rntoast'
import { addPasswordRequest, getMessage } from '../data/actions'
import { TextField, FloatingButton } from 'react-native-ui-lib'

const PasswordRequest = (props: any) => {
  const { state, dispatch } = React.useContext(StoreContext)
  const [mobile, setMobile] = React.useState('')
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState('')
  React.useEffect(() => {
    const patterns = {
      mobile: /^07[7-9][0-9]{7}$/
    }
    const validateMobile = (value: string) => {
      if (patterns.mobile.test(value)){
        setMobileErrorMessage('')
      } else {
        setMobileErrorMessage(labels.invalidMobile)
      }
    }
    if (mobile) validateMobile(mobile)
  }, [mobile])
  const handlePasswordRequest = () => {
    try{
      if (state.passwordRequests.find(r => r.mobile === mobile)) {
        throw new Error('duplicatePasswordRequest')
      }
      addPasswordRequest(mobile)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.sendSuccess}})
      props.navigation.navigate('Home')
    } catch (err){
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
        <FloatingButton
          visible={!!mobile && !mobileErrorMessage}
          button={{
            label: labels.login, 
            onPress: () => handlePasswordRequest(), 
            labelStyle: {fontWeight: '400'}
          }}
        />
        <RNToast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRequest