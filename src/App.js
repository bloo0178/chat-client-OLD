import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { setUserID, setSBSess } from './actions';
import Login from './components/Login';
import CreateChannel from './components/channel/CreateChannel';
import Chat from './components/chat/Chat';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'true',
    }
  }

  // ------------ move to API or async folder -----------------
  // PROBLEM WITH THESE IS THAT THE PROMISE IS CONSIDERED FULFILLED ON 
  // EXECUTION OF THE FUNCTION... NEED TO VALIDATE THE FUNCTION CALLS
  // ACTUALLY FINISH BEFORE RESOLVING THE PROMISE.
  initSession = (APP_ID) => {
    return new Promise(resolve => {
      // Could do the var sb = new SendBird({ appId: APP_ID }) here. Change dispatch function.
      resolve(this.props.dispatch(setSBSess(APP_ID)));
    })
  }

  // !!! This works now - use similar logic for all other async functions // 
  connectUser = (userid) => {
    return new Promise(resolve => {
      //resolve(this.props.sb.connect('test'));
      this.props.sb.connect(userid, (user, error) => {
        if (error) console.log(error);
        resolve(user);
      })
    })
  }
  // --------------- END ASYNC FUNCTIONS -------------------------


  // Initialize the SDK. "new SendBird()" should be called once across the app.
  async componentDidMount() {
    // -------- TEMP FOR STYLING - DELETE ----------------
    // Add <Login> component back in when ready. And remove lines below.
    try {
      this.props.dispatch(setUserID('test'));
      await this.initSession(process.env.REACT_APP_SB_APP_ID);
      await this.connectUser('test');
      this.setState({ loading: 'false' })
    } catch (err) {
      console.log(err);
    }
    // --------- END TEMP ------------------
  }

  render() {
    /*  if (!this.props.userid) {
        return (
          <div className="App">
            <Login />
          </div>
        );
      }*/

    if (this.state.loading === 'true') {
      return (
        <div>
          Loading...
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Chat />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid,
    sb: state.sbsession.sbsession
  }
}

export default connect(
  mapStateToProps
)(App);