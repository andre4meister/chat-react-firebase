import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Preloader from "./Preloader/Preloader";
import Message from "./Message";
import send from '../assets/icons/send-message.png'
import attach from '../assets/icons/attachment.png'

const Chat = () => {

    const {auth,firestore,firebase} = useContext(Context)
    const [user] = useAuthState(auth)
    const [message, setMessage] = useState('')
    // const [writeMessage, setWriteMessage] = useState(false)
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
            <div className={'chat__messages'} key={'chat__messages'}>
                {messages.map( (m, i) => <Message m={m} user={user}/>)}
            </div>
            <div className={'chat__input'} key={'chat__input'}>
                {!message && <img className={'chat__attach'}
                     src={attach} alt={'attach file'}
                />}
                <textarea className={'chat__textarea'} rows={1} value={message} placeholder={'  Write your message'}
                          onChange={ (e) => setMessage(e.target.value)}
                />
                {message && <img className={'chat__send'} onClick={sendMessage}
                        src={send} alt={'send message'}
                />}
            </div>
        </main>
    );
};

export default Chat;