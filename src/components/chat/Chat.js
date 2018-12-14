import React from 'react';
import { connect } from 'react-redux';
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';

//will need local state here to store the channel
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            channel_url: "sendbird_open_channel_45725_710596c6503b8bec6795ee467cefbe987c3b5c37",
            channel: '',
            participants: ''
            //Need a loading state here... !!! 
        }
    }

    // Join the channel. Currently set to a static URL. 
    // Instead of using componentDidMount, may need to wrap this in an HOC
    componentDidMount() {
        this.props.sb.OpenChannel.getChannel(this.state.channel_url, (channel, error) => {
            if (error) {
                console.log('error opening channel');
                return;
            } channel.enter((response, error) => {
                if (error) {
                    return console.log('error entering channel: ' + error);
                }
                console.log('channel entered');
                // Set state to the channel object to use channel methods
                this.setState({
                    channel: channel,
                })

                // Retrieve a list of participants in an open channel.
                // Will have to add an event listener. This does not appear to be updated
                // unless called.
                let participantListQuery = channel.createParticipantListQuery();
                participantListQuery.next((participantList, error) => {
                    if (error) return console.log(error);
                    //Create an array of the userId's to pass to the Participants child component
                    let list = [];
                    participantList.map((participant) => {
                        list.push(participant.userId);
                    })
                    this.setState({
                        participants: list
                    })
                })
            })
        })

        //event handler for users joining
        //https://docs.sendbird.com/javascript/event_handler#3_channel_handler
        var ChannelHandler = new this.props.sb.ChannelHandler();
        ChannelHandler.onUserEntered = (openChannel, user) => {
            this.setState({
                participants: [...this.state.participants, user.userId]
            })
        }
        
        ChannelHandler.onMessageReceived = (channel, message) => {
            this.setState({
                messages: [...this.state.messages,
                `${message._sender.userId}:
                 ${message.message}`]
            })
        }
        this.props.sb.addChannelHandler('UNIQUEID12345', ChannelHandler);
    }

    // Need to push the message this client is sending to the messages
    // array for display. The "onMessageReceived" handler only listens for
    // messages from devices other than the one that is sending the message.
    getMessage = (message) => {
        this.setState({
            messages: [...this.state.messages, 
                `You: 
                ${message}`]
        })
    }

    render() {
        return (
            <div>
                <Participants participants={this.state.participants} />
                <CreateMessage channel={this.state.channel} getMessage={this.getMessage} />
                <DisplayMessages messages={this.state.messages} />
            </div>
        )
    }
}

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession, 
        userid: state.userinfo.userid
    }
}


export default connect(mapStateToProps)(Chat);

