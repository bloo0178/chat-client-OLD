import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
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
                <List subheader={<ListSubheader color="primary">
                        Active Users
                        </ListSubheader>}>
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

const mapStateToProps = state => {
    return {
        participants: state.participants,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Participants));