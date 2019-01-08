import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import { withStyles } from '@material-ui/core/styles';
import OptionsMenu from './OptionsMenu';
import { enterChannel, addChannelHandler, exitChannel } from '../../api/sendbirdAPI';

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
            loading: true
        }

    }

    onUnload = (event) => {
        event.preventDefault();
        let channelHandlerId = `${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`;
        exitChannel(this.props.channel, channelHandlerId, this.props.sb); // this might need to be logout
        // Chrome requires returnValue to be set
        event.returnValue = ''; 
    }

    async componentDidMount() {
        await enterChannel(this.props.sb, this.props.channelURL);
        let channelHandlerId = `${this.props.userid}${this.props.channel.url}${this.props.sb._connectedAt}`;
        addChannelHandler(this.props.sb, channelHandlerId, this.props.channel);
        this.setState({ loading: false })
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    };

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
                    />
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

