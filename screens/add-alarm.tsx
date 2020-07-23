import React from 'react'
import { StoreContext } from '../data/store'
import { addAlarm, getMessage } from '../data/actions'
import labels from '../data/labels'
import Relogin from './relogin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextField, FloatingButton } from 'react-native-ui-lib'
import RNToast from './rntoast'

const AddAlarm = (props: any) => {
  const { state, dispatch} = React.useContext(StoreContext)
  const [pack] = React.useState(() => state.packs.find(p => p.id === props.packId))
  const [price, setPrice] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [priceErrorMessage, setPriceErrorMessage] = React.useState('')
  const [alternative, setAlternative] = React.useState('')
  const [alternativeErrorMessage, setAlternativeErrorMessage] = React.useState('')
  const [offerDays, setOfferDays] = React.useState('')
  const [isOffer, setIsOffer] = React.useState(false)
  const [buttonVisible, setButtonVisisble] = React.useState(false)
  const [currentPrice, setCurrentPrice] = React.useState<number|undefined>(undefined)
  React.useEffect(() => {
    setCurrentPrice(() => {
      if (props.alarmType === 'cp') {
        return state.packPrices.find(p => p.storeId === state.customerInfo?.storeId && p.packId === pack?.id)?.price
      } else {
        return pack?.price
      }
    })
  }, [state.packPrices, props.alarmType, state.customerInfo, pack])
  React.useEffect(() => {
    const validatePrice = (value: string) => {
      if (Number(value) > 0 && Number(value) * 100 !== Number(currentPrice)) {
        setPriceErrorMessage('')
      } else {
        setPriceErrorMessage(labels.invalidPrice)
      }  
    }
    if (price) validatePrice(price)
  }, [price, pack, props.alarmType, currentPrice])
  React.useEffect(() => {
    const patterns = {
      name: /^.{4,50}$/,
    }
    const validateAlternative = (value: string) => {
      if (patterns.name.test(value)){
        setAlternativeErrorMessage('')
      } else {
        setAlternativeErrorMessage(labels.invalidName)
      }
    }  
    if (alternative) validateAlternative(alternative)
  }, [alternative])
  React.useEffect(() => {
    if (!price
    || (isOffer && !offerDays)
    || (props.alarmType === 'aa' && !alternative)
    || (props.alarmType === 'go' && !quantity) 
    || priceErrorMessage
    || alternativeErrorMessage) setButtonVisisble(false)
    else setButtonVisisble(true)
  }, [props.alarmType, price, isOffer, offerDays, alternative, quantity, state.customerInfo, priceErrorMessage, alternativeErrorMessage])
  const formatPrice = (value: string) => {
    return Number(value).toFixed(2)
  } 
  const handleSubmit = () => {
    try{
      if (state.customerInfo?.isBlocked) {
        throw new Error('blockedUser')
      }
      if (offerDays && Number(offerDays) <= 0) {
        throw new Error('invalidPeriod')
      }
      if ((props.alarmType === 'go' && Number(quantity) < 2) || (quantity && props.alarmType === 'eo' && Number(quantity) < 1)){
        throw new Error('invalidQuantity')
      }
      const alarm = {
        packId: pack?.id,
        type: props.alarmType,
        price: Number(price) * 100,
        quantity: Number(quantity),
        alternative,
        offerDays: Number(offerDays),
        status: 'n'
      }
      addAlarm(alarm)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.sendSuccess}})
      props.navigation.navigate('Home')
    } catch (err) {
      dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
    }
  }

  if (!state.user) return <Relogin />
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.productName}
          value={pack?.productName}
          floatOnFocus
          editable={false}
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.packName}
          value={pack?.name}
          floatOnFocus
          editable={false}
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.currentPrice}
          value={((currentPrice || 0) / 100).toFixed(2)}
          floatOnFocus
          editable={false}
        />
        {props.alarmType === 'aa' &&
          <TextField
            containerStyle={{marginBottom: 1}}
            floatingPlaceholder
            placeholder={labels.alternative}
            value={alternative}
            onChangeText={(e: string) => setAlternative(e)}
            floatOnFocus
          />
        }
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.price}
          value={price}
          onChangeText={(e: string) => setPrice(e)}
          floatOnFocus
        />
        {['eo', 'go'].includes(props.alarmType) && 
          <TextField
            containerStyle={{marginBottom: 1}}
            floatingPlaceholder
            placeholder={labels.quantity}
            value={quantity}
            onChangeText={(e: string) => setQuantity(e)}
            floatOnFocus
          />
        }
        <FloatingButton
          visible={buttonVisible}
          button={{
            label: labels.done, 
            onPress: () => handleSubmit(), 
            labelStyle: {fontWeight: '400'}
          }}
        />
        <RNToast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
export default AddAlarm
