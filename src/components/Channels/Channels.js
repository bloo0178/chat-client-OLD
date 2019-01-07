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
}

// Consider making this stateless functional component. 
// Only if not adding a loading state w/ spinner. 
class Channels extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ChannelList history={this.props.history} />
                <CreateChannel history={this.props.history} />
            </div >
        )
    }
}

export default withStyles(styles)(Channels);