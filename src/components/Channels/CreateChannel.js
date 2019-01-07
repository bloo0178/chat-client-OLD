import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'

const styles = {
    root: {
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15
    }
}

class CreateChannel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            name: '',
        }
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    };

    handleCreate = () => {
        var channelURL;
        if (!this.state.name) {
            return alert('Enter a channel name');
        }
        // Array adds the operatorID's to the channel (provides admin privs). 
        this.props.sb.OpenChannel.createChannel(this.state.name, null, null,
            ['admin', this.props.userid], (channel, error) => {
                if (error) { return console.log(error); }
                channelURL = channel.url;
                this.props.dispatch(clearMessages());
                this.props.dispatch(setChannelURL(channelURL));
                this.props.history.push(`/chat/${channelURL}`);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Fab color="primary"
                    aria-label="Add"
                    onClick={this.handleClick}
                    className={classes.fab}>
                    <AddIcon />
                </Fab>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
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
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL,
        userid: state.userinfo.userid
    }
}

export default connect(mapStateToProps)(withStyles(styles)(CreateChannel));

