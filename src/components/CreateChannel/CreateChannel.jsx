import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createChannel, enterChannel } from "../../api/sendBirdAPI";
import { styles } from "./styles";

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: ""
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleCreate = async () => {
    if (!this.state.name) {
      return;
    }
    let newChannelURL = await createChannel(this.state.name);
    await enterChannel(newChannelURL);
    this.props.history.push(`/chat/${newChannelURL}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Fab color="primary" onClick={this.handleClick} className={classes.fab}>
          <AddIcon />
        </Fab>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Channel Name"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(CreateChannel);
