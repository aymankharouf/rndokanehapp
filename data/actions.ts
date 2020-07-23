import firebase from './firebase'
import labels from './labels'
import { iError, iCategory, iAlarm, iPack, iBasketPack } from './interfaces'
import { randomColors, setup } from './config'

export const getMessage = (screen: string, error: iError) => {
  const errorCode = error.code ? error.code.replace(/-|\//g, '_') : error.message
  if (!labels[errorCode]) {
    const logRef = firebase.database().ref('logs').push()
    logRef.set({
      userId: firebase.auth().currentUser?.uid,
      error: error.code,
      screen,
      time: new Date()
    })
  }
  return labels[errorCode] || labels['unknownError']
}

export const login = (mobile: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(mobile + '@gmail.com', mobile.substring(9, 2) + password)
}

export const logout = () => {
  firebase.auth().signOut()
}

export const productOfText = (trademark: string, country: string) => {
  return trademark ? `${labels.productFrom} ${trademark}-${country}` : `${labels.productOf} ${country}`
}

export const quantityText = (quantity: number, weight?: number): string => {
  return weight && weight !== quantity ? `${quantityText(quantity)}(${quantityText(weight)})` : quantity === Math.trunc(quantity) ? quantity.toString() : quantity.toFixed(3)
}

export const getChildren = (categoryId: string, categories: iCategory[]) => {
  let childrenArray = [categoryId]
  let children = categories.filter(c => c.parentId === categoryId)
  children.forEach(c => {
    const newChildren = getChildren(c.id, categories)
    childrenArray = [...childrenArray, ...newChildren]
  })
  return childrenArray
}

export const register = async (mobile: string, name: string, storeName: string, password: string) => {
  await firebase.auth().createUserWithEmailAndPassword(mobile + '@gmail.com', mobile.substring(9, 2) + password)
  let colors = []
  for (var i = 0; i < 4; i++){
    colors.push(randomColors[Number(password.charAt(i))])
  }
  firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).set({
    mobile,
    name,
    storeName,
    colors,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const addAlarm = (alarm: iAlarm) => {
  firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).update({
    alarms: firebase.firestore.FieldValue.arrayUnion({
      ...alarm,
      id: Math.random().toString(),
      time: new Date()  
    })
  })
}

export const addPasswordRequest = (mobile: string) => {
  firebase.firestore().collection('password-requests').add({
    mobile,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const getBasket = (stateBasket: iBasketPack[], packs: iPack[]) => {
  const basket = stateBasket.map(p => {
    const packInfo = packs.find(pa => pa.id === p.packId)
    let lastPrice
    if (p.offerId) {
      const offerInfo = packs.find(pa => pa.id === p.offerId)
      if (!offerInfo) {
        lastPrice = 0
      } else if (offerInfo.subPackId === p.packId) {
        lastPrice = Math.round(offerInfo.price / (offerInfo.subQuantity ?? 0) * (offerInfo.subPercent ?? 0) * (1 + setup.profit))
      } else {
        lastPrice = Math.round(offerInfo.price / (offerInfo.bonusQuantity ?? 0) * (offerInfo.bonusPercent ?? 0) * (1 + setup.profit))
      }
    } else {
      lastPrice = packInfo?.price ?? 0
    }
    const totalPriceText = `${(Math.round(lastPrice * p.quantity) / 100).toFixed(2)}${p.byWeight ? '*' : ''}`
    const priceText = lastPrice === 0 ? labels.itemNotAvailable : (lastPrice === p.price ? `${labels.price}: ${(p.price / 100).toFixed(2)}` : `${labels.priceHasChanged}, ${labels.oldPrice}: ${(p.price / 100).toFixed(2)}, ${labels.newPrice}: ${(lastPrice / 100).toFixed(2)}`)
    const otherProducts = packs.filter(pa => pa.categoryId === packInfo?.categoryId && (pa.sales > packInfo.sales || pa.rating > packInfo.rating))
    const otherOffers = packs.filter(pa => pa.productId === packInfo?.productId && pa.id !== packInfo.id && (pa.isOffer || pa.offerEnd))
    const otherPacks = packs.filter(pa => pa.productId === packInfo?.productId && pa.weightedPrice < packInfo.weightedPrice)
    return {
      ...p,
      price: lastPrice,
      packInfo,
      totalPriceText,
      priceText,
      otherProducts: otherProducts.length,
      otherOffers: otherOffers.length,
      otherPacks: otherPacks.length
    }
  })
  return basket
}
