import React from 'react';
import { connect } from 'react-redux';
import { setUserID, setSBSess } from '../actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    // Initialize the SDK. "new SendBird()" should be called once across the app.
    // https://docs.sendbird.com/javascript 
    // Might want to move this to App.js
    componentDidMount() {
        this.props.dispatch(setSBSess(process.env.REACT_APP_SB_APP_ID));
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handleClick = () => {
        if (!this.state.username) {
            return;
        }
        this.props.dispatch(setUserID(this.state.username));
        console.log('sb');
        console.log(this.props.sb);
        this.props.sb.connect(this.state.username, function (user, error) {
            if (error) { return error }
            console.log('user');
            console.log(user);
        })
        this.setState({ username: '' })
    }

    render() {
        return (
            <div>
                <input value={this.state.username} onChange={this.handleChange} />
                <button type="submit" onClick={this.handleClick}>Submit</button>
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
