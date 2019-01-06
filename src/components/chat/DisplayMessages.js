import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
    },
    messageList: {
        listStyle: 'none',
        padding: 0, // gets rid of the indent
    },
    bubbleWrapper: {
        width: '100%',
        display: 'inline-flex', // sizes bubble to the text
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap', // preserves whitespace
    },
    bubbleYou: {
        background: '#e3f2fd',
        color: '#1c54b2',
        borderRadius: 30,
        lineHeight: 1.3,
        marginBottom: '0.25rem',
        marginRight: '2rem',
        marginLeft: 'auto', // pushes bubble to the right
        maxWidth: '60%',
        padding: 10,
    },
    bubbleOther: {
        background: '#dbdbdb',
        color: 'dark gray',
        borderRadius: 30,
        lineHeight: 1.3,
        marginBottom: '0.25rem',
        marginLeft: '2rem', // keeps bubble to the left
        maxWidth: 400,
        padding: 10,
    },
    infoMessage: {
        margin: 'auto',
        marginBottom: '0.5rem',
        marginTop: '0.5rem',
    }
};

// need to pass in info if this is YOU or another user.
//const DisplayMessages = (props) => {
class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.newMessage = null;
        this.setNewMessageRef = element => {
            this.newMessage = element;
        };
        this.scrollToBottom = () => {
            if (this.newMessage) this.newMessage.scrollIntoView();
        };
    };

    componentDidUpdate() {
        this.scrollToBottom();
    };

    render() {
        const { classes } = this.props;
        let bubbleClass;
        let displayMessage;
        return (
            <div className={classes.root}>
                <ul className={classes.messageList}>
                    {this.props.messages.map((message, index) => {
                        if (message.sender === 'You') {
                            bubbleClass = classes.bubbleYou;
                            displayMessage = `${message.sender}: ${message.message}`;
                        } else if (message.sender == 'info') {
                            bubbleClass = classes.infoMessage;
                            displayMessage = `${message.message}`
                        }
                        // info message (example: "Jeff has joined.")
                        else {
                            bubbleClass = classes.bubbleOther;
                            displayMessage = `${message.sender}: ${message.message}`;
                        }
                        return (
                            <div
                                key={message.message + index.toString()}
                                ref={this.setNewMessageRef}
                                className={classes.bubbleWrapper}>
                                <div className={bubbleClass}>
                                    <li key={index}>{displayMessage}</li>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    };

};

export default withStyles(styles)(DisplayMessages);