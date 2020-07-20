import React, { useContext } from 'react'
import { Colors, Toast, View, Text } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

const RNToast = () => {
  const { state, dispatch } = useContext(StoreContext)
  return (
    <Toast
      visible={!!state.message}
      backgroundColor={state.message ? state.message.type === 'e' ? Colors.red30 : Colors.green30 : 'white'}
      position={'bottom'}
      autoDismiss={3000}
      onDismiss={() => dispatch({type: 'CLEAR_MESSAGE'})}
    >
      <View style={styles.view}>
        <Text style={styles.text}>{state.message?.text}</Text>
        <Ionicons name={state.message?.type === 'e' ? 'md-close' : 'md-checkmark'} style={{...styles.text, fontSize: 30}} />
      </View>
    </Toast>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
    paddingVertical: 10
  }
})

export default RNToast