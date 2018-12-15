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
      resolve(this.props.dispatch(setSBSess(APP_ID)));
    })
  }

  connectUser = (userid) => {
    return new Promise(resolve => {
      resolve(this.props.sb.connect('test'));
      //resolve(cb(userid));
    })
  }

  resolveLoading = () => {
    return new Promise(resolve => {
      resolve(this.setState({ loading: 'false' }));
    })
  }
  // --------------- END ASYNC FUNCTIONS -------------------------


  // Initialize the SDK. "new SendBird()" should be called once across the app.
  async componentDidMount() {
    // -------- TEMP FOR STYLING - DELETE ----------------
    // Add <Login> component back in when ready. And remove
    // lines below.
    this.props.dispatch(setUserID('test'));
    await this.initSession(process.env.REACT_APP_SB_APP_ID);
    await this.connectUser('test', this.props.sb.connect());
    await this.resolveLoading();
    /*this.initSession(process.env.REACT_APP_SB_APP_ID)
      .then(x => this.connectUser('test', this.props.sb.connect()))
      .then(x => this.setState({ loading: false }))*/
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
          <h1>{this.state.loading}</h1>
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