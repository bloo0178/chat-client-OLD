import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel, addMessage } from '../../actions'
import ReactLoading from 'react-loading';
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import LeaveChat from './LeaveChat';
import DeleteChat from './DeleteChat';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            participants: '',
            loading: true
        }
    }

    // Consider triggering a key prop for the Participants component within 
    // the handlers and instead move this logic to the Participant component itself.
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

    async componentDidMount() {
        let channelURL = this.props.match.params.channelurl;
        try {
            await (() => {
                return new Promise(resolve => {
                    this.props.sb.OpenChannel.getChannel(channelURL, (channel, error) => {
                        if (error) return console.log(error);
                        channel.enter((response, error) => {
                            if (error) return console.log(error);
                            // Set state to the channel object to use channel methods
                            // Possibly refactor. Channel might not need to be in Redux store.
                            this.props.dispatch(setOpenChannel(channel));
                            resolve(this.props.channel);
                        })
                    })
                })
            })();
            this.setState({ loading: false })
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

    render() {
        if (this.state.loading === true) {
            return (
                <div className='loading'>
                    <ReactLoading type={"spin"} color={"gray"} />
                </div>
            )
        }
        return (
            <div className='Chat-Wrapper' >
                <div>
                    <p>Channel: {this.props.channel.name}</p>
                    <LeaveChat history={this.props.history} />
                    <DeleteChat history={this.props.history} />
                </div>
                <Participants participants={this.state.participants} />
                <DisplayMessages messages={this.props.messages} />
                <CreateMessage channel={this.props.channel} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        userid: state.userinfo.userid,
        channel: state.channel.openChannel, //currently only accepts openChannels
        messages: state.messages,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(Chat);

