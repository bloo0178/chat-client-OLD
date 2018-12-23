import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel, exitOpenChannel, addMessage, clearMessages } from '../../actions'
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channel_url: "sendbird_open_channel_45725_710596c6503b8bec6795ee467cefbe987c3b5c37",
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
    async componentDidMount() {
        try {
            await (() => {
                return new Promise(resolve => {
                    this.props.sb.OpenChannel.getChannel(this.state.channel_url, (channel, error) => {
                        if (error) return console.log(error);
                        channel.enter((response, error) => {
                            if (error) return console.log(error);
                            // Set state to the channel object to use channel methods
                            this.props.dispatch(setOpenChannel(channel));
                            resolve(this.props.channel);
                        })
                    })
                })
            })();

            this.updateParticipantList(this.props.channel);

            /* ------ EVENT HANDLERS ------
            https://docs.sendbird.com/javascript/event_handler#3_channel_handler
            Need to change the UNIQUE_ID for the addChannelHandler. UserID + channelID + someNumber*/
            var ChannelHandler = new this.props.sb.ChannelHandler();
            this.props.sb.addChannelHandler(`${this.props.userid}${this.props.channel}`, ChannelHandler);
            this.setState({ channelHandler: ChannelHandler })

            ChannelHandler.onUserEntered = (openChannel, user) => {
                this.updateParticipantList(this.props.channel);
            }

            ChannelHandler.onUserExited = (openChannel, user) => {
                this.updateParticipantList(this.props.channel)
            }

            ChannelHandler.onMessageReceived = (channel, message) => {
                this.props.dispatch(addMessage(`${message._sender.userId}: ${message.message}`))
            }
        } catch (err) {
            console.log(err);
        }

        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            this.props.channel.exit((response, error) => {
                if (error) return;
            })
        })
    }

    handleClick = () => {
        this.props.dispatch(clearMessages());
        // The channel is entered on componentDidMount(). 
        // Will have to dispatch a clearChannel and redirect to the channel
        // select screen (to-be-created). 
        this.props.channel.exit((response, error) => {
            if (error) return;
        })
        this.props.dispatch(exitOpenChannel());
    }

    render() {
        // Will have to add test here to see if a channel is
        // assigned. If not, redirect to channel select. 
        console.log('channel test');
        console.log(this.props.channel);
        return (

            <div className='Chat-Wrapper' >
                <Participants
                    participants={this.state.participants} />
                <DisplayMessages messages={this.props.messages} />
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

