import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        overflowY: 'auto',
        minHeight: '60%',
        maxHeight: '60%',
        width: '100%',
        alignSelf: 'flex-start',
        border: 'solid'
    }, 
    messageList: {
        listStyle: 'none'
    }
}

const DisplayMessages = (props) => {
    const { classes } = props;
    if (!props.messages[0]) {
        return (
            <div className={classes.root}></div>
        )
    }
    return (
        <div className={classes.root}>
            <ul className={classes.messageList}>
                {props.messages.map((message, index) => {
                    return <li key={index}>{message.message}</li>
                })}
            </ul>
        </div>
    )
}

export default withStyles(styles)(DisplayMessages);