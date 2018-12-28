import React from 'react';

const DisplayMessages = (props) => {
    if (!props.messages[0]) {
        return (
            <div className="Messages-Display"></div>
        )
    }
    return (
        <div className="Messages-Display">
            <ul>
                {props.messages.map((message, index) => {
                    return <li key={index}>{message.message}</li>
                })}
            </ul>
        </div>
    )
}

export default DisplayMessages;