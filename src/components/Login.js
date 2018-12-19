import React from 'react';
import { connect } from 'react-redux';
import { setUserID, setSBSess } from '../actions';
import { Button, Input } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleClick = async () => {
        if (!this.state.username) {
            return;
        }
        try {
            // Initialize session.
            await (() => {
                // PROBLEM = PROMISE IS CONSIDERED FULFILLED ON 
                // EXECUTION OF THE FUNCTION... NEED TO VALIDATE THE FUNCTION CALLS
                // ACTUALLY FINISH BEFORE RESOLVING THE PROMISE.
                return new Promise(resolve => {
                    this.props.dispatch(setSBSess(process.env.REACT_APP_SB_APP_ID));
                    resolve(this.props.sb);
                })
            })();
            // Connect user.
            await (() => {
                return new Promise(resolve => {
                    this.props.sb.connect(this.state.username, (user, error) => {
                        if (error) console.log(error);
                        resolve(user);
                    })
                })
            })();
            // Set username in Redux store to prompt load of main app.
            this.props.dispatch(setUserID(this.state.username));
            this.setState({ username: '' });
        } catch (err) {
            console.log(err);
        }
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
