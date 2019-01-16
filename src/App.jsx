import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./screens/Login";
import Channels from "./screens/Channels";
import Chat from "./screens/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "true"
    };
  }

  render() {
    const { userid } = this.props;

    return (
      <Router>
        <React.Fragment>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/chat" component={Chat} userid={userid} />
        <ProtectedRoute path="/channels" component={Channels} userid={userid} />
        </React.Fragment>
      </Router>
    )

  }
}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid
  };
};

export default connect(mapStateToProps)(App);
