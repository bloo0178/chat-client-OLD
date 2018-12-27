import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';
import DeleteChannel from './DeleteChannel';
import JoinChannel from './JoinChannel';

class Channels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedChannel: '',
            refreshChannels: false
        }
    }

    // setSelectedChannel() is used to obtain the channelURL from the channelList
    // component. selectedChannel state is passed to JoinChannel and DeleteChannel
    // to perform the respective operations based on which button is clicked.
    setSelectedChannel = (channel) => {
        this.setState({
            selectedChannel: channel
        })
    }

    // refreshChannels() is called from DeleteChannel when a user deletes a channel
    // they are an admin of. refreshChannels is passed to ChannelList as a key.
    // When this value changes, it prompts ChannelList to refresh - reflecting
    // a new list of channels without the channel that was just deleted.
    refreshChannels = () => {
        this.setState({
            refreshChannels: !this.state.refreshChannels
        })
    }

    render() {
        console.log(this.props.history);
        console.log(this.state.refreshChannels);
        return (
            <div>
                <ChannelList
                    key={this.state.refreshChannels}
                    setSelectedChannel={this.setSelectedChannel} />
                <JoinChannel selectedChannel={this.state.selectedChannel} history={this.props.history} />
                <DeleteChannel
                    refreshChannels={this.refreshChannels}
                    selectedChannel={this.state.selectedChannel}
                    history={this.props.history} />
                <CreateChannel />
            </div >
        )
    }
}

export default Channels;