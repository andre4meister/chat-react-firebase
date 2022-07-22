import React from 'react';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {  signOut } from "firebase/auth";


const Nav = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const logout = () => {
        signOut(auth)
            .then( ()=>
                alert('Logout success'))
            .catch( () =>
                alert('An error occurred')
            )
    }
    return (
        <nav className={'navbar'}>
            {user
                ? <NavLink to={'/chat'} className={'navbar__login-logout'} onClick={logout}>
                    Logout
                  </NavLink>
                : <NavLink to={'/login'} className={'navbar__login-logout'}>
                    Login
                </NavLink>}
        </nav>
    );
};

export default Nav;