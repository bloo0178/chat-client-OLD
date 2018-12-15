import React from 'react';
import { connect } from 'react-redux';
import { setUserID } from '../actions';
import { Button, Input } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleClick = () => {
        if (!this.state.username) {
            return;
        }
        this.props.dispatch(setUserID(this.state.username));
        this.props.sb.connect(this.state.username, function (user, error) {
            if (error) { return error }
        })
        this.setState({ username: '' })
    }

    render() {
        return (
            <div className="Login">
                <Input
                    size="sm"
                    placeholder="Enter a username"
                    value={this.state.username} 
                    onChange={this.handleChange} />
                <Button size="sm" type="submit" onClick={this.handleClick}>Submit</Button>
            </div >
        )
    }
}

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(Login);
