import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel, addMessage, clearMessages } from '../../actions'
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channel_url: "sendbird_open_channel_45725_710596c6503b8bec6795ee467cefbe987c3b5c37",
            channelHandler: '',
            participants: ''
        }
    }

    updateParticipantList = (channel) => {
        let participantListQuery = channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            // Create an array of userId's to pass to Participants child component
            let list = [];
            participantList.map((participant) => {
                list.push(participant.userId);
            })
            this.setState({ participants: list })
        })
    }

    // Join the channel. Currently set to a static URL. 
    // May need to turn this to async for dispatch(setOpenChannel) so this.props.channel can be used
    // later on within the componentDidMount() lifecycle.
    componentDidMount() {
        this.props.sb.OpenChannel.getChannel(this.state.channel_url, (channel, error) => {
            if (error) return console.log(error);
            channel.enter((response, error) => {
                if (error) return console.log(error);
                // Set state to the channel object to use channel methods
                this.props.dispatch(setOpenChannel(channel)); 
                this.updateParticipantList(channel);
            })

            /* ------ EVENT HANDLERS ------
            https://docs.sendbird.com/javascript/event_handler#3_channel_handler
            Need to change the UNIQUE_ID for the addChannelHandler. UserID + channelID + someNumber*/
            var ChannelHandler = new this.props.sb.ChannelHandler();
            console.log(channel);
            console.log(this.props.channel);
            this.props.sb.addChannelHandler(`${this.props.userid}${channel}`, ChannelHandler);
            this.setState({ channelHandler: ChannelHandler })

            ChannelHandler.onUserEntered = (openChannel, user) => {
                this.updateParticipantList(this.props.channel);
            }

            ChannelHandler.onUserExited = (openChannel, user) => {
                this.updateParticipantList(this.props.channel)
            }

            ChannelHandler.onUserLeft = (groupChannel, user) => {
                this.updateParticipantList(this.props.channel)
            }

            ChannelHandler.onMessageReceived = (channel, message) => {
                this.props.dispatch(addMessage(`${message._sender.userId}: ${message.message}`))
            }

        })

        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            this.props.channel.exit((response, error) => {
                if (error) return;
            })
        })
    }

    // need to clear out the message object in Redux store
    handleClick = () => {
        this.props.dispatch(clearMessages());
        // This isn't exiting the channel because it persists in state. Also, the channel is entered
        // on componentDidMount(). Will have to dispatch a clearChannel and redirect to the channel
        // select screen (to-be-created). 
        this.props.channel.exit((response, error) => {
            if (error) return;
        })
    }

    render() {
        return (
            <div className='Chat-Wrapper'>
                <Participants
                    participants={this.state.participants}
                    channelHandler={this.state.channelHandler} />
                <DisplayMessages messages={this.props.messages}/>
                <CreateMessage channel={this.props.channel} />
                <button onClick={this.handleClick}>Leave Channel</button>
            </div>
        )
    }

}

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        userid: state.userinfo.userid,
        channel: state.channel.openChannel, //currently only accepts openChannels
        messages: state.messages
    }
}

export default connect(mapStateToProps)(Chat);

