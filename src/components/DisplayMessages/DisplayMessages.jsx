import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.newMessage = null;
    this.setNewMessageRef = element => {
      this.newMessage = element;
    }
    this.scrollToBottom = () => {
      if (this.newMessage) this.newMessage.scrollIntoView();
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const {
      classes: {
        root,
        messageList,
        bubbleYou,
        infoMessage,
        bubbleOther,
        bubbleWrapper
      },
      messages
    } = this.props;

    let bubbleClass;
    let displayMessage;
    return (
      <div className={root}>
        <ul className={messageList}>
          {messages.map((messageObj, index) => {
            const { sender, message } = messageObj;
            if (sender === "You") {
              bubbleClass = bubbleYou;
              displayMessage = `${sender}: ${message}`;
            } else if (sender === "info") {
              bubbleClass = infoMessage;
              displayMessage = `${message}`;
            }
            // info message (example: "Jeff has joined.")
            else {
              bubbleClass = bubbleOther;
              displayMessage = `${sender}: ${message}`;
            }
            return (
              <div
                key={message + index.toString()}
                ref={this.setNewMessageRef}
                className={bubbleWrapper}
              >
                <div className={bubbleClass}>
                  <li key={index}>{displayMessage}</li>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(DisplayMessages);
