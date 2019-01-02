import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel } from '../../actions';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import LeaveChat from './LeaveChat';
import DeleteChat from './DeleteChat';
import Handlers from './Handlers';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            participantsKey: false,
            loading: true
        }
    }

    // Triggers a change of the key value associated to the Participants component
    // when the channel handler detects a participant joined or left. 
    updateParticipantList = () => {
        this.setState({
            participantsKey: !this.state.participantsKey
        })
    }

    async componentDidMount() {
        // IIFE obtains the channel info from SendBird to be used for all chat functionality. 
        await (() => {
            return new Promise(resolve => {
                this.props.sb.OpenChannel.getChannel(this.props.channelURL, (channel, error) => {
                    if (error) return console.log(error);
                    channel.enter((response, error) => {
                        if (error) return console.log(error);
                        // Possibly refactor. Channel might not need to be in Redux store.
                        this.props.dispatch(setOpenChannel(channel));
                        resolve(this.props.channel);
                    })
                })
            })
        })();

        this.setState({ loading: false })
        this.updateParticipantList(this.props.channel);

        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            this.props.channel.exit((response, error) => {
                if (error) return alert(error);
            })
        })
    }

    render() {
        if (!this.props.channelURL) {
            alert('Select a channel to join.');
            return (
                <Redirect to="/channels" />
            )
        }
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
                    <Handlers updateParticipantList={this.updateParticipantList} />
                    <p>Channel: {this.props.channel.name}</p>
                    <LeaveChat history={this.props.history} />
                    <DeleteChat history={this.props.history} />
                </div>
                <Participants
                    channel={this.props.channel}
                    key={this.state.participantsKey} />
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

