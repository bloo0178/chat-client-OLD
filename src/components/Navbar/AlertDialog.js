import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.showAlert}
        onClose={props.toggleAlert}
      >
        <DialogTitle>{"No channel selected."}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to select a channel before you can chat.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleAlert} color="primary" autoFocus>
            Close
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;