import React from 'react'
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native'
import { Icon } from 'native-base'
import Home from './screens/home'
import About from './screens/about'
import Login from './screens/login'
import Basket from './screens/basket'
import Register from './screens/register'
import PasswordRequest from './screens/password-request'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const LogoTitle = (props: any) => {
  return (
    <Image
      style={{ width: 130 }}
      source={require('./assets/dokaneh_logo.png')}
    />
  )
}
const stack1 = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator 
    >
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{ 
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => <Icon name='ios-menu' style={{padding: 20}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>,
        }}
      />
      <Stack.Screen name='About' component={About} />
      <Stack.Screen name='Basket' component={Basket} />
    </Stack.Navigator>  
  )
}

const stack2 = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ 
          headerLeft: () => <Icon name='md-arrow-forward' style={{padding: 20}} onPress={() => navigation.navigate('Home')}/>,
        }}
      />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='PasswordRequest' component={PasswordRequest} />
    </Stack.Navigator>  
  )
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home"
          component={stack1}
        />
        <Drawer.Screen 
          name="Login"
          component={stack2}
        />
      </Drawer.Navigator>
    </NavigationContainer>

  )
}

export default Navigator