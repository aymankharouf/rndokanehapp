import React from 'react'
import Reducer from './reducer'
import firebase from './firebase'
import { iContext, iState, iCategory } from './interfaces'

export const StoreContext = React.createContext({} as iContext)

const Store = (props: any) => {
  const initState: iState = {
    categories: [], 
    locations: [], 
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
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        dispatch({type: 'LOGIN', payload: user})
        const unsubscribeLocations = firebase.firestore().collection('lookups').doc('l').onSnapshot(doc => {
          dispatch({type: 'SET_LOCATIONS', payload: doc.data()?.values})
        }, err => {
          unsubscribeLocations()
        })  
    }})
  }, [])
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
 
export default Store

