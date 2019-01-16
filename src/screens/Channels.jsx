import React from "react";
import ChannelList from "./channels/ChannelList";
import CreateChannel from "./channels/CreateChannelButton";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./channels/styles";
import Navbar from "../components/Navbar";

const Channels = props => {
  const {
    classes: { root, createChannel, channelList },
    history
  } = props;
  return (
    <React.Fragment>
      <Navbar history={history} />
      <div className={root}>
        <div className={channelList}>
          <ChannelList history={history} />
        </div>
        <div className={createChannel}>
          <CreateChannel history={history} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(Channels);
