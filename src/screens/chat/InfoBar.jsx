import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const InfoBar = props => {
  const { title, children } = props;

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </React.Fragment>
  )
}

export default InfoBar;
