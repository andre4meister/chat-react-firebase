import React from 'react';

const Message = ({m, user}) => {
    return (
        <section className={ user.uid === m.uid ?
            'chat__message message my-message'
            :
            'chat__message message friend-message'}
                     key={m.uid + m.message.slice(0,10)}>
            <img className={'message__photo'} src={m.photoUrl} alt={`${m.displayName} avatar`}/>
            <div className={'message__text-name'}>
                <h5>{m.displayName}</h5>
                <span className={'message__text'}>{m.message}</span>
            </div>
        </section>);
}

export default Message;