import firebase from './firebase'
import labels from './labels'
import { iError } from './interfaces'

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