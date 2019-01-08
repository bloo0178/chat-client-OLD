import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sendMessage } from '../../api/sb_api';

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
    };

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    };

    handleClick = () => {
        sendMessage(this.state.message);
        this.setState({ message: '' });
    };

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
    };

};

export default withStyles(styles)(CreateMessage);
