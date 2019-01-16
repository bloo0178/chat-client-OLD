import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Participants from "./optionsMenu/Participants";
import {
  exitChannel,
  deleteChannel,
  isOperator
} from "../../../utils/channelHelpers";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { styles } from "./optionsMenu/styles";
import { SharedSnackbarConsumer } from "../../../components/SharedSnackbar.context";

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      toggleParticipants: false,
      disableDelete: true
    };
  }

  componentDidMount() {
    this.setState({
      disableDelete: !isOperator()
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeave = () => {
    exitChannel();
    this.props.history.push("/channels");
  };

  handleDelete = openSnackbar => async () => {
    const { channel, history } = this.props;
    await deleteChannel();
    history.push("/channels");
    openSnackbar(`Channel ${channel.name} deleted.`);
  };

  toggleParticipants = () => {
    this.setState({
      toggleParticipants: !this.state.toggleParticipants
    });
    this.handleClose();
  };

  render() {
    const {
      classes: { deleteButton }
    } = this.props;
    const { anchorEl, disableDelete, toggleParticipants } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          <MenuItem onClick={this.toggleParticipants}>
            View Participants
          </MenuItem>
          <MenuItem onClick={this.handleLeave}>Leave Channel</MenuItem>
          <SharedSnackbarConsumer>
            {({ openSnackbar }) => (
            <MenuItem
              disabled={disableDelete}
              onClick={this.handleDelete(openSnackbar)}
              className={deleteButton}
            >
              Delete Channel
            </MenuItem>
            )}
          </SharedSnackbarConsumer>
        </Menu>
        <Participants
          open={toggleParticipants}
          toggle={this.toggleParticipants}
        />
      </React.Fragment>
    );
  }
}

OptionsMenu.contextType = SharedSnackbarConsumer;

const mapStateToProps = state => {
  return {
    channel: state.channel.channel,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(withStyles(styles)(OptionsMenu));
