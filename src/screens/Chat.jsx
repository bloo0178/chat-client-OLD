import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateMessage from "./chat/CreateMessage";
import MessagesDisplay from "./chat/MessagesDisplay";
import { withStyles } from "@material-ui/core/styles";
import { exitChannel } from "../utils/channelHelpers";
import { addChannelHandler } from "../utils/channelHandlers";
import InfoBar from "./chat/InfoBar";
import OptionsMenu from "./chat/infoBar/OptionsMenu";
import { styles } from "./chat/styles";
import Navbar from "../components/Navbar";
import { WithSnackbarContext } from '../components/withSnackbarContext';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  onUnload = event => {
    event.preventDefault();
    exitChannel(); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  componentDidMount() {
    addChannelHandler();
    this.setState({ loading: false });
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  render() {
    const {
      classes: {
        loadingSpinner,
        infoContainer,
        root,
        displayMessages,
        createMessage
      },
      history,
      messages,
      channel: { name }
    } = this.props;

    if (this.state.loading === true) {
      return (
        <div className={loadingSpinner}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Navbar history={history} />
        <div className={root}>
          <div className={infoContainer}>
            <InfoBar title={name} history={history}>
              <OptionsMenu history={history} />
            </InfoBar>
          </div>
          <div className={displayMessages}>
            <MessagesDisplay messages={messages} />
          </div>
          <div className={createMessage}>
            <CreateMessage />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channel.channel,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Chat));
