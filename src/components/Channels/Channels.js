import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    root: {
        width: '100%',
        flexGrow: 1,
    }, 
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0, 
        margin: 15
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
                    {/*<div>
                        <CreateChannel />
                    </div>*/}
                    <CreateChannel history={this.props.history} />
                </Grid>
                {/*<Fab color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>*/}
            </div >
        )
    }
}

export default withStyles(styles)(Channels);