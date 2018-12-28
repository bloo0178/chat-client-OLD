import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
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
                <InputGroup>
                <Input
                    size="sm"
                    placeholder="Enter a channel name"
                    value={this.state.name}
                    onChange={this.handleChange}>
                </Input>
                <InputGroupAddon addonType="append">
                <Button size="sm" onClick={this.handleClick}>Create</ Button>
                </InputGroupAddon>
                </InputGroup>
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

export default connect(mapStateToProps)(CreateChannel);