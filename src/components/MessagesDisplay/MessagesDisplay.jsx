import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import MessageBubble from "../MessageBubble/MessageBubble";

class MessagesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.newMessage = null;
    this.setNewMessageRef = element => {
      this.newMessage = element;
    };
    this.scrollToBottom = () => {
      if (this.newMessage) this.newMessage.scrollIntoView();
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const {
      classes: { messageList },
      messages
    } = this.props;

    return (
      <React.Fragment>
        <ul className={messageList}>
          {messages.map((messageObj, index) => {
            const { sender, message } = messageObj;
            return (
              <li key={message + index.toString()} ref={this.setNewMessageRef}>
                <MessageBubble sender={sender} message={message} />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MessagesDisplay);
