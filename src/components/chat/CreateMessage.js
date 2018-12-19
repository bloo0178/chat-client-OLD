import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class CreateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleClick = () => {
        let channel = this.props.channel;
        console.log('channel');
        console.log(this.props);
        channel.sendUserMessage(this.state.message, (message, error) => {
            if (error) return console.log(error);
            console.log(message.message);
        })
        // Access the getMessage() state in the parent Chat component 
        // to add to the messages array for display.
        this.props.getMessage(this.state.message);
        this.setState({
            message: ''
        })
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

export default CreateMessage;