import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import Channels from './components/Channels/Channels';
import Chat from './components/Chat/Chat';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Snackbar from './components/Snackbar';

const styles = {
  root: {
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'true',
      openAlert: false,
      alertMessage: ''
    }
  }

  // Recieve alert message from child components. Transition in snackbar.
  // Currently only used for delete channel functionality within Chat > OptionsMenu.
  handleAlert = (message) => {
    this.setState({
      openAlert: true,
      alertMessage: message
    })
  };

  // Sent to Snackbar to close itself. Snackbar needs to be held at the top level of the 
  // app, due to alerts being accompanied by instant redirects.
  closeAlert = () => {
    this.setState({
      openAlert: false, 
      alertMessage: '',
    });
  };

  render() {

    const { classes } = this.props;

    if (!this.props.userid) {
      return (
        <Router>
          <div>
            <Redirect to="/login" />
            <Route path="/login" component={Login} />
          </div>
        </Router>
      );
    };

    return (
      <Router>
        <div>
          <Route
            render={(props) =>
              <Navigation {...props} key={this.props.channelURL} />}
          />
          <div className={classes.root}>
            <Route path='/chat'
              render={(props) =>
                <Chat {...props} key={this.props.channelURL}
                  sendAlert={this.handleAlert} />} 
            />
            <Route exact path="/channels" component={Channels} />
          </div>
          <Route render={(props) =>
            <Snackbar {...props} open={this.state.openAlert}
              message={this.state.alertMessage} close={this.closeAlert} />}
          />
        </div>
      </Router>
    )
  };

};

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid,
    channel: state.channel.openChannel,
    channelURL: state.channel.channelURL
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));