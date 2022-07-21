import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Preloader from "./Preloader/Preloader";
import Message from "./Message";

const Chat = () => {

    const {auth,firestore,firebase} = useContext(Context)
    const [user] = useAuthState(auth)
    const [message, setMessage] = useState('')
    const [writeMessage, setWriteMessage] = useState(false)
    const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))
    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setMessage('');
    }


    if (loading) {
        return <Preloader/>
    }
    return (
        <main className={'chat'}>
            <div className={'chat__messages'}>
                {messages.map( (m, i) => <Message m={m} user={user}/>)}
            </div>
            {writeMessage ?
                <textarea className={'chat__textarea'} rows={1} value={message} placeholder={'  Write your message'}
                          onChange={ (e) => setMessage(e.target.value)}
                          onBlur={ () => setWriteMessage(false)}/>
                :
                <input className={'message_input'} value={message} type={'text'} onFocus={ () => setWriteMessage(true)}
                    placeholder={'Click here to write a message'}/>
            }
            {message && <button className={'chat__button'} onClick={sendMessage}>Send message</button>}

        </main>
    );
};

export default Chat;