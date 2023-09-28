import firebase from 'firebase/app'
import 'firebase/database'
const serviceAccount = require('~/firebasekey.json')

if (!firebase.apps.length) {
  firebase.initializeApp(serviceAccount)
}

if (process.env.MODE === 'development') {
  firebase.database().useEmulator('127.0.0.1', 9000)
}

const db = firebase.database()
export default db
