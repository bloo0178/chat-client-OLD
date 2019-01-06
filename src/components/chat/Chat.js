import React from 'react';
import { connect } from 'react-redux';
import { setOpenChannel } from '../../actions';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Participants from './Participants';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import Handlers from './Handlers';
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
                <div className='loading'>
                    <CircularProgress />
                </div>
            )
        }
        return (
            <div className={classes.root} >
                <div className={classes.infoContainer}>
                    <Handlers updateParticipantList={this.updateParticipantList} />
                    <h4>Channel: {this.props.channel.name}</h4>
                    <OptionsMenu history={this.props.history} key={this.state.participantsKey}/>
                    {/*<div>
                    <Participants2
                        channel={this.props.channel}
                    key={this.state.participantsKey} />
                    </div>*/}
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

