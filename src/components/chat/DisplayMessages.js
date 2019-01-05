import React from 'react';
import { withStyles } from '@material-ui/core/styles';


// the text is centered, and the bubble is just filling per the margin rules...
const styles = {
    root: {
        boxSizing: 'border-box',
        border: 'solid',
    },
    messageList: {
        listStyle: 'none',
    },
    bubbleWrapper: {
        width: '100%',
        display: 'inline-flex',

    },
    bubbleYou: {
        background: '#e3f2fd',
        color: '#1c54b2',
        borderRadius: 30,
        lineHeight: 1.3,
        marginBottom: '0.25rem',
        marginRight: '2rem',
        marginLeft: 'auto', // this pushes it to the right
        maxWidth: 400,
        padding: 10,
    },
    bubbleOther: {
        background: '#e3f2fd',
        color: '#1c54b2',
        borderRadius: 30,
        lineHeight: 1.3,
        marginBottom: '0.25rem',
        //marginLeft: '2rem',
        //marginLeft: 'auto', // this pushes it to the right
        maxWidth: 400,
        padding: 10,
    }
};

// need to pass in info if this is YOU or another user.
const DisplayMessages = (props) => {
    const { classes } = props;
    let bubbleClass;
    let count = 1;
    return (
        <div className={classes.root}>
            <ul className={classes.messageList}>
                {props.messages.map((message, index) => {
                    if (count % 2 == 0) {
                        bubbleClass = classes.bubbleYou;
                        count++;
                    } else {
                        bubbleClass = classes.bubbleOther;
                        count++;
                    }
                    return (
                        <div className={classes.bubbleWrapper}>
                            <div className={bubbleClass}>
                                <li key={index}>{message.message}</li>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default withStyles(styles)(DisplayMessages);