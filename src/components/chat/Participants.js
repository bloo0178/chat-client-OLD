import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = {
    root: {
        width: '100%',
        alignSelf: 'flex-start',
    }
};

class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            participantList: []
        };
    };

    componentDidMount() {
        let participantListQuery = this.props.channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            // Create an array of userId's pulled from each participant object.
            let list = [];
            participantList.map((participant) => {
                list.push(participant.userId);
            })
            this.setState({ participantList: list })
        })
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="participants">
                <h4
                    className={classes.root}
                    onClick={this.handleClick}
                >
                    Participants
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </h4>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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
                </Collapse>

            </div>
        )

    }

}

export default withStyles(styles)(Participants);