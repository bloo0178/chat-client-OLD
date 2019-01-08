import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { connect } from 'react-redux';

const styles = {
    root: {
        width: 250,
    },
};

class Participants extends React.Component { // change this to a stateless component. Will it still update on recieving props?

    render() {
        const { classes } = this.props;

        const participantList = (
            <div className={classes.root}>
                <List >
                    <ListItem className={classes.list}>
                        <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                        <ListItemText primary={`Active Users`} />
                    </ListItem>
                </List>
                <Divider />
                <List >
                    {this.props.participants.map((participant, index) => {
                        return (
                            <ListItem
                            className={classes.list}
                                key={participant + index.toString()}>
                                {participant}
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        );

        return (
            <div>
                <Drawer open={this.props.open} onClick={this.props.toggle}>
                    <div>
                        {participantList}
                    </div>
                </Drawer>
            </div>
        );
    };
};

Participants.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        participants: state.participants,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Participants));