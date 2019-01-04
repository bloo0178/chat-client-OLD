import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        width: '100%',
        flexGrow: 1,
    }
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
                <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                    <div>
                        <ChannelList history={this.props.history} />
                    </div>
                    <div>
                        <CreateChannel />
                    </div>
                </Grid>
            </div >
        )
    }
}

export default withStyles(styles)(Channels);