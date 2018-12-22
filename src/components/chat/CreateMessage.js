import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class CreateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }

    handleClick = () => {
        this.props.channel.sendUserMessage(this.state.message, (message, error) => {
            if (error) return console.log(error);
            console.log(message.message);
        })
        this.props.dispatch(addMessage(`You: ${this.state.message}`));
        this.setState({ message: '' });
    }

    render() {
        return (
            <div className="Create-Message">
                <InputGroup>
                    <Input
                        size="sm"
                        onChange={this.handleChange}
                        value={this.state.message}>
                    </Input>
                    <InputGroupAddon addonType="append">
                        <Button
                            size="sm"
                            onClick={this.handleClick}>
                            Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

export default connect()(CreateMessage);
