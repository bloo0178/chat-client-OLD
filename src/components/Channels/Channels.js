import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';
import DeleteChannel from './DeleteChannel';


const Channels = (props) => {
    return (
        <div>
            Channels Main
            <ChannelList />
            <CreateChannel />
            <DeleteChannel />
        </div>
    )
}

export default Channels;