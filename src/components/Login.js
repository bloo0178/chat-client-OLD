import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { initializeSBSession, connectUser } from '../api/sendbirdAPI';

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
        await initializeSBSession(process.env.REACT_APP_SB_APP_ID);
        await connectUser('test', this.props.sb);
        this.props.history.push('/channels');
    };
    // ------------------------ END TEMP CODE ----------------------------- // 

    handleClick = async () => {
        if (!this.state.username) return;
        await initializeSBSession(process.env.REACT_APP_SB_APP_ID);
        await connectUser(this.state.username, this.props.sb);
        this.props.history.push('/channels');
    };

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
    };
};

// Defined in the Reducer
const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Login));
