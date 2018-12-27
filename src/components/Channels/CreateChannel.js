import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import { Input, Button } from 'reactstrap';
import { BrowserRouter as Router, Redirect, Link } from 'react-router-dom';

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
        this.props.sb.OpenChannel.createChannel(this.state.name, null, null, null, (channel, error) => {
            if (error) { return console.log(error); }
            channelURL = channel.url;
            console.log('channelURL: ' + channelURL);
            this.props.dispatch(clearMessages());
            this.props.dispatch(setChannelURL(channelURL));
            this.setState({
                channelCreated: true
            })
        });
    }

    render() {
        if (this.state.channelCreated) {
            console.log('expected redirect');
            console.log(this.props.channelURL);
            return (
                <Redirect to={{
                    pathname: `/chat/${this.props.channelURL}`
                }} />
            )
        }
        return (
            <div>
                <h4>Add a Channel</h4>
                <Input
                    size="sm"
                    placeholder="Enter a channel name"
                    value={this.state.name}
                    onChange={this.handleChange}>
                </Input>
                <Button size="sm" onClick={this.handleClick}>Create a Channel</ Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession,
        channelURL: state.channel.channelURL
    }
}

export default connect(mapStateToProps)(CreateChannel);