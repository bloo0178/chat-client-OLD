import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel, addMessage } from '../../actions';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import { withStyles } from '@material-ui/core/styles';
import OptionsMenu from './OptionsMenu';

const styles = {
    root: {
        width: '100%',
        height: '90vh', // maybe position at bottom?
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'flex-end',

    },
    displayMessages: {
        overflowY: 'auto',
    },
    createMessage: {
        width: '100%'
    },
    infoContainer: {
        maxHeight: '7vh',
        minHeight: '7vh',
        marginBottom: 'auto',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    loadingSpinner: {
        height: '90vh', // maybe position at bottom?
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            participantsKey: false,
            loading: true
        }
    }

    // ----------------- MAY BE ABLE TO DELETE THIS ------------------------- //
    // Triggers a change of the key value associated to the Participants component
    // when the channel handler detects a participant joined or left. 
    updateParticipantList = () => {
        this.setState({
            updateParticipantsList: !this.state.updateParticipantsList
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

        // ------ EVENT HANDLERS ------
        // https://docs.sendbird.com/javascript/event_handler#3_channel_handler 
        var ChannelHandler = new this.props.sb.ChannelHandler();
        this.props.sb.addChannelHandler(`${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`, ChannelHandler);

        ChannelHandler.onUserEntered = (openChannel, user) => {
            this.updateParticipantList();
            this.props.dispatch(addMessage('info', `${user.userId} has joined.`))
        };

        ChannelHandler.onUserExited = (openChannel, user) => {
            this.updateParticipantList();
            this.props.dispatch(addMessage('info', `${user.userId} has left.`))
        };

        ChannelHandler.onMessageReceived = (channel, message) => {
            this.props.dispatch(addMessage(message._sender.userId, message.message));
        };

        this.setState({ loading: false })

        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            this.props.channel.exit((response, error) => {
                if (error) return alert(error);
            })
        })
    }

    render() {
        const { classes } = this.props;
        if (!this.props.channelURL) {
            alert('Select a channel to join.');
            return (
                <Redirect to="/channels" />
            )
        }
        if (this.state.loading === true) {
            return (
                <div className={classes.loadingSpinner}>
                    <CircularProgress />
                </div>
            )
        }
        return (
            <div className={classes.root} >
                <div className={classes.infoContainer}>
                    <h4>Channel: {this.props.channel.name}</h4>
                    <OptionsMenu
                        {...this.props} // includes sendAlert for snackbar
                        history={this.props.history}
                        key={this.state.updateParticipantsList} />
                </div>
                <div className={classes.displayMessages}>
                    <DisplayMessages messages={this.props.messages} />
                </div>
                <div className={classes.createMessage}>
                    <CreateMessage channel={this.props.channel} />
                </div>
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

export default connect(mapStateToProps)(withStyles(styles)(Chat));

