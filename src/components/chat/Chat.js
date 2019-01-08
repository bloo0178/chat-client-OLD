import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import { withStyles } from '@material-ui/core/styles';
import OptionsMenu from './OptionsMenu';
import { addChannelHandler, exitChannel } from '../../api/sb_api';

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
        exitChannel(); // this might need to be logout
        // Chrome requires returnValue to be set
        event.returnValue = '';
    }

    async componentDidMount() {
        addChannelHandler();
        this.setState({ loading: false })
        window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    };

    render() {
        const { classes } = this.props;

        if (!this.props.channel) {
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
                        // Props includes sendAlert() from <App> for snackbar
                        {...this.props}
                        channel={this.props.channel}
                        history={this.props.history}
                    />
                </div>
                <div className={classes.displayMessages}>
                    <DisplayMessages messages={this.props.messages} /> {/* connect to store directly? */}
                </div>
                <div className={classes.createMessage}>
                    <CreateMessage />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        channel: state.channel.channel,
        messages: state.messages,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Chat));

