import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OptionsMenu from './OptionsMenu';

const InfoBar = (props) => {

    return (
        <div>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    {props.channel.name}
                </Typography>
                <OptionsMenu history={props.history} />
            </Toolbar>
        </div>
    )

};

export default InfoBar;