import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9


const firebaseConfig = {
    apiKey: "AIzaSyC0kHFkWfK9vjyDMMkawctE5ODKIY8xUz4",
  authDomain: "otp-auth-3ec49.firebaseapp.com",
  projectId: "otp-auth-3ec49",
  storageBucket: "otp-auth-3ec49.appspot.com",
  messagingSenderId: "329814847480",
  appId: "1:329814847480:web:95e633592ccc4b0278300d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase

