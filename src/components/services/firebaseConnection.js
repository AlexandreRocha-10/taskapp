import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV_GkQdhk6hiH2rM5K5F-iqJZMI3hGmf0",
  authDomain: "taskapp-f89e9.firebaseapp.com",
  projectId: "taskapp-f89e9",
  storageBucket: "taskapp-f89e9.appspot.com",
  messagingSenderId: "680823149821",
  appId: "1:680823149821:web:1aa124ba3fb5eb867eda94"
};

// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;