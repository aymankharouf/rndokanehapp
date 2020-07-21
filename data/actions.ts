import firebase from './firebase'
import labels from './labels'
import { iError, iCategory } from './interfaces'

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

export const getChildren = (categoryId: string, categories: iCategory[]) => {
  let childrenArray = [categoryId]
  let children = categories.filter(c => c.parentId === categoryId)
  children.forEach(c => {
    const newChildren = getChildren(c.id, categories)
    childrenArray = [...childrenArray, ...newChildren]
  })
  return childrenArray
}
