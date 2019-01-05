import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import Channels from './components/Channels/Channels';
import Chat from './components/Chat/Chat';
import Navigation from './components/Navbar';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Snackbar from './components/Snackbar';
import { withStyles } from '@material-ui/core/styles';
//import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
     //display: 'flex',
     //flexFlow: 'column',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'true'
    }
  }

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
      )
    }
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
                <Chat {...props} key={this.props.channelURL} />}
            />
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

//export default connect(mapStateToProps)(App);
export default connect(mapStateToProps)(withStyles(styles)(App));