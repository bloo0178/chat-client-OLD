import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        width: '60%'
    },
    button: {
        margin: '5px'
    }
};

class CreateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }

    handleClick = () => {
        this.props.channel.sendUserMessage(this.state.message, (message, error) => {
            if (error) return console.log(error);
            console.log(message.message);
        })
        //this.props.dispatch(addMessage(`You: ${this.state.message}`));
        this.props.dispatch(addMessage('You', this.state.message));
        this.setState({ message: '' });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TextField
                    multiline
                    rowsMax="4"
                    value={this.state.message}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Button className={classes.button}
                    variant="contained"
                    onClick={this.handleClick}
                    color="primary">
                    Send
                </Button>
            </div>
        )
    }
}

export default connect()(withStyles(styles)(CreateMessage));
