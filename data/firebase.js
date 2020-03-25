
import firebase from 'firebase'
//import 'firebase/database'
//import 'firebase/auth'
//import 'firebase/storage'
import { devConfig } from '../apiKeys'


firebase.initializeApp(devConfig)
//firebase.firestore().enablePersistence()
export default firebase
