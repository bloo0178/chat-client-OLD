import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';


const Channels = (props) => {
    return (
        <div>
            Channels Main
            <ChannelList />
            <CreateChannel />
        </div>
    )
}

export default Channels;