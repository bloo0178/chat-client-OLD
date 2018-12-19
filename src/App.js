import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { setUserID, setSBSess } from './actions';
import Login from './components/Login';
import CreateChannel from './components/channel/CreateChannel';
import Chat from './components/Chat/Chat';
import Navigation from './components/Navbar';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faMinus, faPlus);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'true', // maybe add a loading state to the redux store instead. 
    }
  }

  render() {
    console.log(this.props);
      if (!this.props.userid) {
        return (
          <div className="App">
            <Login />
          </div>
        );
      }

    else {
      return (
        <div>
          <div className="navbar-wrapper" >
            <Navigation />
          </div>
          <div className="content-wrapper">
            <Chat />
          </div>
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