import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React from "react";
import {observer} from "mobx-react-lite";
import firebase from "firebase/compat";

const App = observer(() => {

    const firebaseConfig = {
        apiKey: "AIzaSyBMkMOb9Rhe_sn2aH8kOkzsZsUStOlFYEY",
        authDomain: "shoprc-storage.firebaseapp.com",
        projectId: "shoprc-storage",
        storageBucket: "shoprc-storage.appspot.com",
        messagingSenderId: "442490580280",
        appId: "1:442490580280:web:c6c269233fb3e4625865cd",
        measurementId: "G-8KXP0CCJMJ"
    };

    firebase.initializeApp(firebaseConfig)

  return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
  );
})

export default App;