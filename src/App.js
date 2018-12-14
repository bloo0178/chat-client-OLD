import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import CreateChannel from './components/channel/CreateChannel';
import Chat from './components/chat/Chat';


class App extends Component {

  render() {

    if (!this.props.userid) {
      return (
        <div className="App">
          <Login />
        </div>
      );
    }

    else {
      return (
        <div className="App">
          <CreateChannel />
          {this.props.userid}
          <Chat />
        </div>
      )
    }
  }

}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid
  }
}

export default connect(
  mapStateToProps
)(App);