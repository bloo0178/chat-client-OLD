import React from "react";
import ChannelList from "../../components/ChannelList/ChannelList";
import CreateChannel from "../../components/CreateChannel/CreateChannel";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

const Channels = props => {
  const {
    classes: { root },
    history
  } = props;
  return (
    <div className={root}>
      <ChannelList history={history} />
      <CreateChannel history={history} />
    </div>
  );
};

export default withStyles(styles)(Channels);
