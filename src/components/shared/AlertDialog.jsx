import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = ({ showAlert, toggleAlert }) => (
  <React.Fragment>
    <Dialog open={showAlert} onClose={toggleAlert}>
      <DialogTitle>{"No channel selected."}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to select a channel before you can chat.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleAlert} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);

export default AlertDialog;
