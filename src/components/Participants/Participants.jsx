import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { connect } from "react-redux";
import { styles } from "./styles";

class Participants extends React.Component {
  // change this to a stateless component. Will it still update on recieving props?

  render() {
    const {
      classes: { root, list },
      participants,
      open,
      toggle
    } = this.props;

    const participantList = (
      <div className={root}>
        <List
          subheader={
            <ListSubheader color="primary">Active Users</ListSubheader>
          }
        >
          {participants.map((participant, index) => {
            return (
              <ListItem className={list} key={participant + index.toString()}>
                {participant}
              </ListItem>
            );
          })}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={open} onClick={toggle}>
          <div>{participantList}</div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    participants: state.participants
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Participants));
