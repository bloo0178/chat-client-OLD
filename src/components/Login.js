import React from 'react';
import { connect } from 'react-redux';
import { setUserID, setSBSess } from '../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        height: '100vh',
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value })
    }

    // ------------------------ BEGIN TEMP CODE --------------------------- // 

    async componentDidMount() {
        // Initialize session.
        await (() => {
            return new Promise(resolve => {
                this.props.dispatch(setSBSess(process.env.REACT_APP_SB_APP_ID));
                resolve(this.props.sb);
            })
        })();
        // Connect user.
        await (() => {
            return new Promise(resolve => {
                this.props.sb.connect('test', (user, error) => {
                    if (error) console.log(error);
                    resolve(user);
                })
            })
        })();
        // Set username in Redux store to prompt load of main app.
        this.props.dispatch(setUserID('test'));
        // Redirect to main
        this.props.history.push("/channels");
    }

    // ------------------------ END TEMP CODE ----------------------------- // 

    handleClick = async () => {
        if (!this.state.username) {
            return;
        }
        try {
            // Initialize session.
            await (() => {
                return new Promise(resolve => {
                    this.props.dispatch(setSBSess(process.env.REACT_APP_SB_APP_ID));
                    resolve(this.props.sb);
                })
            })();
            // Connect user.
            await (() => {
                return new Promise(resolve => {
                    this.props.sb.connect(this.state.username, (user, error) => {
                        if (error) console.log(error);
                        resolve(user);
                    })
                })
            })();
            // Set username in Redux store to prompt load of main app.
            this.props.dispatch(setUserID(this.state.username));
            // Redirect to main
            this.props.history.push("/channels");
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                className={classes.root}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <TextField
                    placeholder="Enter a username"
                    margin="normal"
                    label="Username"
                    InputLabelProps={{ shrink: true, }}
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClick}>
                    Submit
                </Button>

            </Grid>
        )
    }
}

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
