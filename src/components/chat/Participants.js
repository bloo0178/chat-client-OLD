import React from 'react';

const Participants = (props) => {

    if (props.participants) {
        return (
            <div>
                <h3>Participant List</h3>
                <ul>
                    {props.participants.map((participant, index) => {
                        return (
                        <li key={participant + index.toString()}>{participant}</li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Participant List</h3>
            </div>
        )
    }

}

export default Participants;