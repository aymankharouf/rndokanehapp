import React from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { login, getMessage } from '../data/actions'
import labels from '../data/labels'
import { StoreContext } from '../data/store'

const Login = (props: any) => {
  const { dispatch } = React.useContext(StoreContext)
  const [password, setPassword] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState('')
  React.useEffect(() => {
    const patterns = {
      password: /^.{4}$/,
    }
    const validatePassword = (value: string) => {
      if (patterns.password.test(value)){
        setPasswordErrorMessage('')
      } else {
        setPasswordErrorMessage(labels.invalidPassword)
      }
    }
    if (password) validatePassword(password)
  }, [password])
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
  const handleLogin = async () => {
    try{
      await login(mobile, password)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.addSuccess}})
      props.navigation.navigate('Home')
    } catch (err){
      dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
    }
  }
  return (
    <Container>
      <Content>
          <Form>
            <Item fixedLabel success={!mobileErrorMessage} error={!!mobileErrorMessage}>
              <Label>mobile</Label>
              <Input onChangeText={e => setMobile(e)} />
            </Item>
            <Item fixedLabel>
              <Label>Password</Label>
              <Input onChangeText={e => setPassword(e)} />
            </Item>
            <Button transparent block onPress={() => handleLogin()}>
              <Text>Login</Text>
            </Button>
          </Form>
      </Content>
    </Container>
  )
  
}

export default Login