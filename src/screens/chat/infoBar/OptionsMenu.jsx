import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Participants from "./optionsMenu/Participants";
import { exitChannel, deleteChannel, isOperator } from "../../../utils/channelHelpers";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { styles } from "./optionsMenu/styles";

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      toggleParticipants: false,
      disableDelete: true
    }
  }

  componentDidMount() {
    this.setState({
      disableDelete: !isOperator()
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLeave = () => {
    exitChannel();
    this.props.history.push("/channels");
  }

  handleDelete = async () => {
    await deleteChannel();
    this.props.history.push("/channels");
  }

  toggleParticipants = () => {
    this.setState({
      toggleParticipants: !this.state.toggleParticipants
    })
    this.handleClose();
  }

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
          <MenuItem
            disabled={disableDelete}
            onClick={this.handleDelete}
            className={deleteButton}
          >
            Delete Channel
          </MenuItem>
        </Menu>
        <Participants
          open={toggleParticipants}
          toggle={this.toggleParticipants}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channel.channel,
    messages: state.messages
  }
}

export default connect(mapStateToProps)(withStyles(styles)(OptionsMenu));
