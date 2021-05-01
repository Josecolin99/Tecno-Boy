import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCHHQy6SJ6lfc945FPcMIBhRuso9Jmnl5M",
    authDomain: "tecno-boy.firebaseapp.com",
    projectId: "tecno-boy",
    storageBucket: "tecno-boy.appspot.com",
    messagingSenderId: "991407562158",
    appId: "1:991407562158:web:a39abdf7705feab7293c3f"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)