import './App.css';
import {BrowserRouter} from "react-router-dom";
import Nav from "./Components/Nav";
import AppRouter from "./Components/AppRouter";
import React, {useContext} from 'react';
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Preloader from "./Components/Preloader/Preloader";

function App() {

    const {auth} = useContext(Context)
    const [user, loading, error] = useAuthState(auth)
    console.log(!user, !error)
    if (loading) {
        return <Preloader/>
    }

    return (

    <BrowserRouter>
        <Nav />
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
