import React from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { logout } from "../../api/sendBirdAPI";
import AlertDialog from "../shared/AlertDialog";

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showAlert: false
    }
  }

  handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  toggleAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert
    })
  }

  handleToChat = () => {
    const { channelURL, history } = this.props;
    if (!channelURL) {
      this.handleClose();
      this.toggleAlert();
    } else {
      this.handleClose();
      history.push(`/chat/${channelURL}`);
    }
  }

  render() {
    const { anchorEl, showAlert } = this.state;
    return (
      <React.Fragment>
        <IconButton color="inherit">
          <MenuIcon onClick={this.handleOpen} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleToChat}>Chat</MenuItem>
            <MenuItem
              onClick={this.handleClose}
              component={Link}
              to={"/channels"}
            >
              Channels
            </MenuItem>
            <MenuItem onClick={logout} component={Link} to={"/login"}>
              Logout
            </MenuItem>
          </Menu>
        </IconButton>
        <AlertDialog showAlert={showAlert} toggleAlert={this.toggleAlert} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    channelURL: state.channel.channel.url
  }
}

export default connect(mapStateToProps)(NavMenu);
