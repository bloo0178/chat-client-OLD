import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Login from "./screens/login/Login";
import Channels from "./screens/channels/Channels";
import Chat from "./screens/chat/Chat";
import Navbar from "./components/shared/Navbar/Navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {}
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "true"
    };
  }

  render() {
    const {
      classes: { root },
      userid
    } = this.props;

    if (!userid) {
      return (
        <Router>
          <Fragment>
            <Redirect to="/login" /> {/* do this differently */}
            <Route path="/login" component={Login} />
          </Fragment>
        </Router>
      );
    }

    return (
      <Router>
        <Fragment>
          <Route component={Navbar} />
          <div className={root}>
            <Route path="/chat" component={Chat} />
            <Route exact path="/channels" component={Channels} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    userid: state.userinfo.userid
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
