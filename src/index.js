import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


firebase.initializeApp({
    apiKey: "AIzaSyBewxAMG8Ta_1qnNp6UEceZIJq9rUWB32Y",
    authDomain: "chat-react-3daf2.firebaseapp.com",
    projectId: "chat-react-3daf2",
    storageBucket: "chat-react-3daf2.appspot.com",
    messagingSenderId: "885086644145",
    appId: "1:885086644145:web:273d1a94471d14c350bf90",
    measurementId: "G-N0TS7FC0MC"
})
export const Context = React.createContext(null)

const auth = firebase.auth();
const firestore = firebase.firestore();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
          firebase,
          auth,
          firestore,
      }}>
          <App />
      </Context.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
