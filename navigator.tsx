import React from 'react'
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image } from 'react-native'
import Home from './screens/home'
import About from './screens/about'
import Login from './screens/login'
import Basket from './screens/basket'
import Register from './screens/register'
import PasswordRequest from './screens/password-request'
import { Button } from 'react-native-ui-lib'
import Logout from './screens/logout'
import { Ionicons } from '@expo/vector-icons'

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
const BackButton = (props: any) => {
  return (
    <Button
      style={{margin: 10}}
      link
      onPress={() => props.navigation.navigate('Home')}
    >
      <Ionicons name='md-arrow-forward' style={{fontSize: 24}} />
    </Button>
  )
}
const MenuButton = (props: any) => {
  return (
    <Button
      style={{margin: 10}}
      link
      onPress={() => props.navigation.openDrawer()}
    >
      <Ionicons name='md-menu' style={{fontSize: 24}} />
    </Button>
  )
}

const stack1 = (props: any) => {
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
          headerLeft: () => <MenuButton {...props} />,
        }}
      />
      <Stack.Screen name='About' component={About} />
      <Stack.Screen name='Basket' component={Basket} />
    </Stack.Navigator>  
  )
}

const stack2 = (props: any) => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ 
          headerLeft: () => <BackButton {...props} />,
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