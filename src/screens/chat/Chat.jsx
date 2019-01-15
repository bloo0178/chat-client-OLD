import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateMessage from "../../components/CreateMessage/CreateMessage";
import MessagesDisplay from "../../components/MessagesDisplay/MessagesDisplay";
import { withStyles } from "@material-ui/core/styles";
import { addChannelHandler, exitChannel } from "../../api/sendBirdAPI";
import InfoBar from "../../components/InfoBar/InfoBar";
import OptionsMenu from "../../components/OptionsMenu/OptionsMenu";
import { styles } from "./styles";

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

  async componentDidMount() {
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
