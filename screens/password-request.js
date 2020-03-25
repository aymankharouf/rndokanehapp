import React, { useState, useEffect } from 'react';
import { Form, Item, Input, Label, Button, Text, Spinner, Container, Content, Icon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import labels from '../data/labels'
import { login, showMessage, showError, getMessage } from '../data/actions'

const PasswordRequest = props => {
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [mobileErrorMessage, setMobileErrorMessage] = useState('')
  const [error, setError] = useState('')
  const [inprocess, setInprocess] = useState(false)
  useEffect(() => {
    const patterns = {
      password: /^.{4}$/,
    }
    const validatePassword = value => {
      if (patterns.password.test(value)){
        setPasswordErrorMessage('')
      } else {
        setPasswordErrorMessage(labels.invalidPassword)
      }
    }
    if (password) validatePassword(password)
    else setPasswordErrorMessage('')
  }, [password])
  useEffect(() => {
    const patterns = {
      mobile: /^07[7-9][0-9]{7}$/
    }
    const validateMobile = value => {
      if (patterns.mobile.test(value)){
        setMobileErrorMessage('')
      } else {
        setMobileErrorMessage(labels.invalidMobile)
      }
    }
    if (mobile) validateMobile(mobile)
    else setMobileErrorMessage('')
  }, [mobile])
  useEffect(() => {
    if (error) {
      showError(error)
      setError('')
    }
  }, [error])
  const handleLogin = async () => {
    try{
      setInprocess(true)
      await login(mobile, password)
      setInprocess(false)
      showMessage(labels.loginSuccess)
      props.navigation.goBack()
    } catch (err){
      setInprocess(false)
      setError(getMessage(props, err))
    }
  }
  if (inprocess) return (<Container><Content><Spinner /></Content></Container>)
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <Form>
          <Item fixedLabel error={mobileErrorMessage !== ''} success={mobile !== '' && !mobileErrorMessage}>
            <Label>{labels.mobile}</Label>
            <Input 
              value={mobile} 
              placeholder={labels.mobilePlaceholder}
              onChange={e => setMobile(e.nativeEvent.text)} 
            />
            {mobileErrorMessage ? <Icon name='close-circle' onPress={() => setMobile('')} /> : null}
            {mobile === '' || mobileErrorMessage ? null : <Icon name='checkmark-circle' />}
          </Item>
          <Item fixedLabel error={passwordErrorMessage !== ''} success={password !== '' && !passwordErrorMessage}>
            <Label>{labels.password}</Label>
            <Input 
              value={password}
              placeholder={labels.passwordPlaceholder} 
              onChange={e => setPassword(e.nativeEvent.text)} 
            />
            {passwordErrorMessage ? <Icon name='close-circle' onPress={() => setPassword('')} /> : null}
            {password === '' || passwordErrorMessage ? null : <Icon name='checkmark-circle' />}
          </Item>
        </Form>
        {!mobile || !password || mobileErrorMessage || passwordErrorMessage ? null : 
          <Button large block transparent onPress={handleLogin}>
            <Text>{labels.login}</Text>
          </Button>
        }
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default PasswordRequest