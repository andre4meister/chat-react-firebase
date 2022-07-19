import React from 'react';

const Message = ({m, user}) => {
    return (<div className={ user.uid === m.uid ? 'chat__message message my-message' :'chat__message message friend-message'}
                 key={m.uid + m.message.slice(0,10)}>
        <div className={'message__fullName'}>{m.displayName}</div>
        <img className={'message__photo'} src={m.photoUrl} alt={`${m.displayName} avatar`}/>
        <div className={'message__text'}>{m.message}</div>
        {/*<div>{m.createdAt}</div>*/}
    </div>);
}

export default Message;