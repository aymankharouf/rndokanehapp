import React from 'react';
import { View } from 'react-native';
import { logout } from '../data/actionst'

const Logout = (props: any) => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      logout()
    })
    return unsubscribe;
  }, [props.navigation]);

  return <View />;
}

export default Logout