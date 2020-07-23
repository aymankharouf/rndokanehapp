import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard, FlatList, StyleSheet } from 'react-native'
import { StoreContext } from '../data/store'
import { getMessage, quantityText, getBasket, productOfText } from '../data/actions'
import labels from '../data/labels'
import { setup } from '../data/config'
import { iBasketPack } from '../data/interfaces'
import { ActionSheet, AnimatableManager, ListItem, Text, ThemeManager, Colors, BorderRadiuses } from 'react-native-ui-lib'
import * as Animatable from 'react-native-animatable';

const Basket = (props: any) => {
  const { state, dispatch } = React.useContext(StoreContext)
  const [submitVisible, setSubmitVisible] = React.useState(true)
  const [currentPack, setCurrentPack] = React.useState<iBasketPack | undefined>(undefined)
  const [basket, setBasket] = React.useState<iBasketPack[]>([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [weightedPacks, setWeightedPacks] = React.useState<iBasketPack[]>([])
  const [customerOrdersTotals] = React.useState(() => {
    const activeOrders = state.orders.filter(o => ['n', 'a', 'e', 'f', 'p'].includes(o.status))
    return activeOrders.reduce((sum, o) => sum + o.total, 0)
  })
  const hintsList = React.useRef<ActionSheet>(null)
  React.useEffect(() => {
    if (state.basket.length === 0) {
      props.navigation.navigate('Home')
    } else {
      setBasket(getBasket(state.basket, state.packs))
    }
  }, [state.basket, state.packs])
  React.useEffect(() => {
    setTotalPrice(() => basket.reduce((sum, p) => sum + Math.round(p.price * p.quantity), 0))
    setWeightedPacks(() => basket.filter(p => p.byWeight))
  }, [basket])
  React.useEffect(() => {
    const orderLimit = state.customerInfo?.orderLimit ?? setup.orderLimit
    if (customerOrdersTotals + totalPrice > orderLimit){
      setSubmitVisible(false)
    } else {
      setSubmitVisible(true)
    }
  }, [state.customerInfo, customerOrdersTotals, totalPrice])
  const renderItem = (item: iBasketPack) => {
    return (
      <Animatable.View key={item.packId} {...AnimatableManager.presets.fadeIn}>
        <ListItem
          height={80}
          containerStyle={styles.border}
          onPress={() => props.navigation.navigate('ProductPacks', {id: item.packId})}
        >
          <ListItem.Part>
          </ListItem.Part>
          <ListItem.Part containerStyle={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14}}>{item.productName}</Text>
            {item.productAlias ? <Text style={{fontSize: 12, color: 'red'}}>{item.productAlias}</Text> : null}
            <Text style={{fontSize: 12, color: 'green'}}>{productOfText(item.productTrademark, item.productCountry)}</Text>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    )
  }
  const handleConfirm = () => {
    try{
      if (state.customerInfo?.isBlocked) {
        throw new Error('blockedUser')
      }
      props.navigation.navigate('ConfirmOrder')
    } catch(err) {
			dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
		}
  }
  const handleIncrease = (pack: iBasketPack) => {
    try{
      dispatch({type: 'INCREASE_QUANTITY', payload: pack})
      const orderLimit = state.customerInfo?.orderLimit ?? setup.orderLimit
      if (customerOrdersTotals + totalPrice > orderLimit){
        throw new Error('limitOverFlow')
      }  
    } catch(err) {
			dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
		}
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <FlatList 
          data={basket} 
          renderItem={({ item }) => renderItem(item)} 
          keyExtractor={item => item.packId}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
  
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

export default Basket

