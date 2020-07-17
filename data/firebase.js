
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { devConfig } from '../apiKeys'

firebase.initializeApp(devConfig)
//firebase.firestore().enablePersistence()
export default firebase