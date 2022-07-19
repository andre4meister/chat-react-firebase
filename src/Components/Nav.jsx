import React from 'react';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Nav = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <nav className={'navbar'}>
            {user
                ? <button>Logout</button>
                : <NavLink to={'/login'}>
                    <button>Login</button>
                </NavLink>}
        </nav>
    );
};

export default Nav;