import React, { createContext, useReducer, useEffect, useState } from 'react'
import Reducer from './reducer'
import firebase from './firebase'

export const StoreContext = createContext()

const Store = props => {
  const [user, setUser] = useState(null)
  const initState = {
    categories: [], 
    locations: [], 
    countrie: [],
  }
  const [state, dispatch] = useReducer(Reducer, initState)
  useEffect(() => {
    const unsubscribeCategories = firebase.firestore().collection('categories').onSnapshot(docs => {
      let categories = []
      docs.forEach(doc => {
        categories.push({...doc.data(), id:doc.id})
      })
      dispatch({type: 'SET_CATEGORIES', payload: categories})
    }, err => {
      unsubscribeCategories()
    })
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      if (user){
        const unsubscribeLocations = firebase.firestore().collection('lookups').doc('l').onSnapshot(doc => {
          dispatch({type: 'SET_LOCATIONS', payload: doc.data().values})
        }, err => {
          unsubscribeLocations()
        })  
        const unsubscribeCountries = firebase.firestore().collection('lookups').doc('c').onSnapshot(doc => {
          dispatch({type: 'SET_COUNTRIES', payload: doc.data().values})
        }, err => {
          unsubscribeCountries()
        })
    }})
  }, [])
  return (
    <StoreContext.Provider value={{state, user, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
 
export default Store

