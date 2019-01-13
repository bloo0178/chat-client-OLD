import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const InfoBar = (props) => {

    return (
        <div>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    {props.title}
                </Typography>
                {props.children}
            </Toolbar>
        </div>
    )

};

export default InfoBar;