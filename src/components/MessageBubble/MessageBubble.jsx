import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

const MessageBubble = props => {
  const {
    classes: { bubbleYou, infoMessage, bubbleOther, bubbleWrapper },
    sender,
    message
  } = props;
  let bubbleClass;
  let displayMessage;
  if (sender === "You") {
    bubbleClass = bubbleYou;
    displayMessage = `${sender}: ${message}`;
  } else if (sender === "info") {
    bubbleClass = infoMessage;
    displayMessage = `${message}`;
  } else {
    bubbleClass = bubbleOther;
    displayMessage = `${sender}: ${message}`;
  }
  return (
    <div className={bubbleWrapper}>
      <div className={bubbleClass}>{displayMessage}</div>
    </div>
  );
};

export default withStyles(styles)(MessageBubble);
