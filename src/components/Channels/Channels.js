import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Channels = (props) => {
        const { classes } = props;
        return (
            <div className={classes.root}>
                <ChannelList history={props.history} />
                <CreateChannel history={props.history} />
            </div >
        )
};

export default withStyles(styles)(Channels);