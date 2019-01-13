import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateMessage from './CreateMessage';
import DisplayMessages from './DisplayMessages';
import { withStyles } from '@material-ui/core/styles';
import { addChannelHandler, exitChannel } from '../../api/sb_api';
import InfoBar from './InfoBar';
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

        if (this.state.loading === true) {
            return (
                <div className={classes.loadingSpinner}>
                    <CircularProgress />
                </div>
            )
        };

        return (
            <div className={classes.root} >
                <div className={classes.infoContainer}>
                    <InfoBar
                        title={this.props.channel.name}
                        history={this.props.history}
                    >
                        <OptionsMenu history={this.props.history} />
                    </InfoBar>
                </div>
                <div className={classes.displayMessages}>
                    <DisplayMessages messages={this.props.messages} /> {/* connect to store directly? */}
                </div>
                <div className={classes.createMessage}>
                    <CreateMessage />
                </div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        channel: state.channel.channel,
        messages: state.messages,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Chat));

