import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const InfoBar = props => {
  const { title, children } = props;

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </div>
  )
}

export default InfoBar;
