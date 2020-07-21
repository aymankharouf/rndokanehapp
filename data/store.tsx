import React from 'react'
import Reducer from './reducer'
import firebase from './firebase'
import { iContext, iState, iCategory, iPack, iPackPrice } from './interfaces'

export const StoreContext = React.createContext({} as iContext)

const Store = (props: any) => {
  const initState: iState = {
    categories: [], 
    locations: [], 
    packs: []
  }
  const [state, dispatch] = React.useReducer(Reducer, initState)
  React.useEffect(() => {
    const unsubscribeCategories = firebase.firestore().collection('categories').onSnapshot(docs => {
      let categories: iCategory[] = []
      docs.forEach(doc => {
        categories.push({
          id: doc.id,
          name: doc.data().name,
          parentId: doc.data().parentId,
          ordering: doc.data().ordering,
          isLeaf: doc.data().isLeaf
        })
      })
      dispatch({type: 'SET_CATEGORIES', payload: categories})
    }, err => {
      unsubscribeCategories()
    })
    const unsubscribePacks = firebase.firestore().collection('packs').where('price', '>', 0).onSnapshot(docs => {
      let packs: iPack[] = []
      let packPrices: iPackPrice[] = []
      docs.forEach(doc => {
        packs.push({
          id: doc.id,
          name: doc.data().name,
          productId: doc.data().productId,
          productName: doc.data().productName,
          productAlias: doc.data().productAlias,
          productDescription: doc.data().productDescription,
          imageUrl: doc.data().imageUrl,
          price: doc.data().price,
          categoryId: doc.data().categoryId,
          sales: doc.data().sales,
          rating: doc.data().rating,
          ratingCount: doc.data().ratingCount,
          isOffer: doc.data().isOffer,
          offerEnd: doc.data().offerEnd,
          weightedPrice: doc.data().weightedPrice,
          isDivided: doc.data().isDivided,
          trademark: doc.data().trademark,
          country: doc.data().country,
          closeExpired: doc.data().closeExpired
        })
        if (doc.data().prices) {
          doc.data().prices.forEach((p: iPackPrice) => {
            packPrices.push({...p, packId: doc.id})
          })
        }
      })
      dispatch({type: 'SET_PACKS', payload: packs})
      dispatch({type: 'SET_PACK_PRICES', payload: packPrices})
    }, err => {
      unsubscribePacks()
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        dispatch({type: 'LOGIN', payload: user})
        const unsubscribeLocations = firebase.firestore().collection('lookups').doc('l').onSnapshot(doc => {
          dispatch({type: 'SET_LOCATIONS', payload: doc.data()?.values})
        }, err => {
          unsubscribeLocations()
        })  
      } else {
        dispatch({type: 'LOGOUT'})
      }
    })
  }, [])
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
 
export default Store

