import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {publicRoutes, privateRoutes, CHAT_ROUTE, LOGIN_ROUTE} from '../routes';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";


const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ?
        (<Routes>
            {privateRoutes.map( ({Component, path}) =>
                <Route key ={path} path={path} element={<Component/>} exact={true}/>)}
            <Route path={'*'} element={ <Navigate to={CHAT_ROUTE} exact={true}/>} />
        </Routes>)
        :
        (<Routes>
            {publicRoutes.map( ({Component, path}) =>
                 <Route key ={path} path={path} element={<Component/>} />)}
            <Route  path={'*'} element={ <Navigate to={LOGIN_ROUTE} exact={true}/>} />
        </Routes>);
};

export default AppRouter;