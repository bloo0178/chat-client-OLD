import React from 'react';
import { connect } from 'react-redux';
import { refreshChannels } from '../../actions/actions'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getChannelList, enterChannel } from '../../api/sb_api';

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

    async componentDidMount() { 
        let channelList = await getChannelList();
        this.props.dispatch(refreshChannels(channelList));
    }

    handleClick = channelURL => async event => {
        await enterChannel(channelURL);
        this.props.history.push(`/chat/${channelURL}`);
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <List 
                    className={classes.list}
                    subheader={<ListSubheader color="primary">
                        Channels
                        </ListSubheader>}
                    >
                        {this.props.channels.map((channel, index) => {
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
    };
};

const mapStateToProps = state => {
    return {
        channels: state.channels
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ChannelList));