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

const styles = {
    root: {
        width: 250,
    },
};

class Participants extends React.Component {
    state = {
        participantList: [],
    };

    componentDidMount() {
        let participantListQuery = this.props.channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            // Create an array of userId's pulled from each participant object.
            let list = [];
            participantList.map((participant) => {
                list.push(participant.userId);
                return null;
            });
            console.log(list);
            this.setState({ participantList: list });
        });
    };

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
                    {this.state.participantList.map((participant, index) => {
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

export default withStyles(styles)(Participants);