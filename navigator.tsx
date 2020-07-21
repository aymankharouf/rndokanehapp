import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
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
import { StoreContext } from './data/store'
import labels from './data/labels'
import Categories from './screens/categories'


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

const HomeStack = createStackNavigator()
const HomeStackScreen = (props: any) => {
    return (
    <HomeStack.Navigator 
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
    >
      <HomeStack.Screen 
        name="Home"
        component={Home}
        options={{ 
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => <MenuButton {...props} />,
        }}
      />
      <HomeStack.Screen name='Basket' component={Basket} options={{title: labels.basket}} />
      <HomeStack.Screen name='About' component={About} options={{title: labels.about}} />
      <HomeStack.Screen name='Categories' component={Categories} options={{title: labels.categories}} />
    </HomeStack.Navigator>  
  )
}

const LoginStack = createStackNavigator()
const LoginStackScreen = (props: any) => {
  return (
    <LoginStack.Navigator
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
    >
      <LoginStack.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: labels.login,
          headerLeft: () => <BackButton {...props} />,
        }}
      />
      <LoginStack.Screen name='Register' component={Register} />
      <LoginStack.Screen name='PasswordRequest' component={PasswordRequest} />
    </LoginStack.Navigator>  
  )
}

const Drawer = createDrawerNavigator()
const Navigator = () => {
  const { state } = React.useContext(StoreContext)
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home"
          component={HomeStackScreen}
          options={{
            title: labels.home,
          }}
        />
        {state.user ? 
          <Drawer.Screen 
            name="Logout"
            component={Logout}
            options={{
              title: labels.logout,
            }}
          />
        : <Drawer.Screen 
            name="Login"
            component={LoginStackScreen}
            options={{
              title: labels.login,
            }}
          />
        }
      </Drawer.Navigator>
    </NavigationContainer>

  )
}

export default Navigator