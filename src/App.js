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
      loading: 'true'
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
    }
    return (
      <Router>
        <div>
          <Route
            render={(props) =>
              <Navigation {...props} key={this.props.channelURL} />}
          />
          <div className="content-wrapper">
            <Route path='/chat/:channelurl' component={Chat} />
            <Route exact path="/channels" component={Channels} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid,
    channel: state.channel.openChannel,
    channelURL: state.channel.channelURL
  }
}

export default connect(mapStateToProps)(App);