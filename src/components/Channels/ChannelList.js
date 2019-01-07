import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '50%',
        minWidth: 300,
        maxWidth: 600,
        display: 'flex',
        padding: '3rem',
    },
    paper: {
        width: '100%',
        textAlign: 'center',
    },
    heading: {
        justifyContent: 'center',
    },
    list: {
        maxHeight: '50vh',
        overflowY: 'auto',
    }, 
    button: {
        width: '100%',
        padding: '1rem',
    }
}

class ChannelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channels: []
        }
    }

    componentDidMount() {
        var openChannelListQuery = this.props.sb.OpenChannel.createOpenChannelListQuery();
        openChannelListQuery.next((channels, error) => {
            if (error) return console.log(error);
            this.setState({
                channels: channels
            })
        })
    }

    handleClick = channelURL => event => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(setChannelURL(channelURL));
        this.props.history.push(`/chat/${channelURL}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
        
            <Paper className={classes.paper}>
                <h4 className={classes.heading}>Channels</h4>
                <Divider />
                <List className={classes.list}>
                    {this.state.channels.map((channel, index) => {
                        return (
                            <div key={channel.name + index.toString()}>
                                <Button
                                    onClick={this.handleClick(channel.url)}
                                    className={classes.button}>
                                    {channel.name}
                                </Button>
                            </div>
                        )
                    })}
                </List>
            </Paper>
       
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ChannelList));