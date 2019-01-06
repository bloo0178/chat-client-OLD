import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class Participants extends React.Component {
    state = {
        open: false,
        participantList: [],
    };

    toggleDrawer = (open) => () => {
        this.setState({
            open: open,
        });
    };

    // may need to trigger with a key (see original 'update participants list' function in chat)
    componentDidMount() {
        let participantListQuery = this.props.channel.createParticipantListQuery();
        console.log(participantListQuery);
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            // Create an array of userId's pulled from each participant object.
            let list = [];
            participantList.map((participant) => {
                list.push(participant.userId);
            });
            console.log(list);
            this.setState({ participantList: list });
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List component="div" disablePadding>
                    {this.state.participantList.map((participant, index) => {
                        return (
                            <ListItem
                                key={participant + index.toString()}
                                className={classes.nested}>
                                {participant}
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        );

        return (
            <div>
                <Button onClick={this.toggleDrawer(true)}>Open Left</Button>
                <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

Participants.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Participants);