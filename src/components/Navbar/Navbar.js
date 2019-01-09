import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavMenu from './NavMenu';

const styles = {
    root: {
        display: 'flex',
    },
    menuIcon: {
        marginLeft: 'auto',
    },
};

const Navbar = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        react.chat
                        </Typography>
                    <div className={classes.menuIcon} >
                        <NavMenu history={props.history} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default withStyles(styles)(Navbar);