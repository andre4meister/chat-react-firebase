import React, {useContext} from 'react';
import {Context} from "../index";

const Login = () => {
    const {auth,firebase} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        console.log(user)
    }
    return (
        <main className={'login'}>
            <button className={'login__button'} onClick={login}>Authorize with Google</button>
            <img alt={'people talk'} className={'login__image'}
                 src={'https://img.freepik.com/free-vector/hand-drawn-flat-people-talking_52683-70233.jpg?w=2000'}/>
        </main>
    );
};

export default Login;