import React from 'react';

const DisplayMessages = (props) => {

    return (
        <div className="Messages-Display">
            <ul>
                {props.messages.map((message, index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>
        </div>
    )
}

export default DisplayMessages;