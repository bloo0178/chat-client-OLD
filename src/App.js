import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import Channels from './components/Channels/Channels';
import Chat from './components/Chat/Chat';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'true',
    };
  };

  render() {

    const { classes } = this.props;

    if (!this.props.userid) {
      return (
        <Router>
          <div>
            <Redirect to="/login" /> {/* do this differently */}
            <Route path="/login" component={Login} />
          </div>
        </Router>
      );
    };

    return (
      <Router>
        <div>
          <Route component={Navbar} />
          <div className={classes.root}>
            <Route path='/chat' component={Chat} />
            <Route exact path="/channels" component={Channels} />
          </div>
        </div>
      </Router>
    )
  };

};

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));