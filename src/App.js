import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import Channels from './components/Channels/Channels';
import Chat from './components/Chat/Chat';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
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
    if (!this.props.userid) {
      return (
        <Router>
          <div>
            <Redirect to="/login" />
            <Route path="/login" component={Login} />
          </div>
        </Router>
      )
    } else {
      return (
        // if no channel, then redirect to channels. 
        // Will have to add a Redirect in the chat component. 
        <Router>
          <div>
            <div className="navbar-wrapper">
              <Route component={Navigation} />
            </div>
            <div className="content-wrapper">
              <Route exact path="/" component={Chat} />
              <Route exact path="/channels" component={Channels} />
            </div>
          </div>
        </Router>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid
  }
}

export default connect(mapStateToProps)(App);