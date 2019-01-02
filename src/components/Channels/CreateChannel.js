import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import { BrowserRouter as Router, Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateChannel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            channelCreated: false
        }
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleClick = async () => {
        var channelURL;
        if (!this.state.name) {
            return alert('Enter a channel name');
        }
        // Array adds the operatorID's in
        // need to add the user who created it as an operator
        this.props.sb.OpenChannel.createChannel(this.state.name, null, null, ['admin', 'test', this.props.userid], (channel, error) => {
            if (error) { return console.log(error); }
            channelURL = channel.url;
            this.props.dispatch(clearMessages());
            this.props.dispatch(setChannelURL(channelURL));
            this.setState({
                channelCreated: true
            })
        });
    }

    render() {
        if (this.state.channelCreated) {
            return (
                <Redirect to={{
                    pathname: `/chat/${this.props.channelURL}`
                }} />
            )
        }
        return (
            <div>
                <h4>Create a Channel</h4>
                <TextField
                    label="Channel Name"
                    style={{ margin: 8 }}
                    //placeholder="Enter your new channel name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClick}>
                    Create
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL,
        userid: state.userinfo.userid
    }
}

//export default connect(mapStateToProps)(withStyles(styles)(CreateChannel));
export default connect(mapStateToProps)(CreateChannel);