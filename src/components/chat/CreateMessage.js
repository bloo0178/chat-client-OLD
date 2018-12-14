import React from 'react';

class CreateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state={
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
        channel.sendUserMessage(this.state.message, (message, error) => {
            if (error) return console.log(error);
            console.log(message.message);
        })
        this.props.getMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange} value={this.state.message}></input>
                <button onClick={this.handleClick}>Send</button>
            </div>
        )
    }
}

export default CreateMessage;