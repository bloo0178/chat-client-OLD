import React from "react";
import { connect } from "react-redux";
import { refreshChannels } from "../../redux/actions/actions"; //"../../actions/actions";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { getChannelList, enterChannel } from "../../api/sendBirdAPI";
import { styles } from "./styles";

class ChannelList extends React.Component {
  async componentDidMount() {
    let channelList = await getChannelList();
    this.props.dispatch(refreshChannels(channelList));
  }

  handleClick = channelURL => async event => {
    await enterChannel(channelURL);
    this.props.history.push(`/chat/${channelURL}`);
  }

  render() {
    const {
      classes: { paper, root, list, button },
      channels
    } = this.props;

    return (
      <div className={root}>
        <Paper className={paper}>
          <List
            className={list}
            subheader={<ListSubheader color="primary">Channels</ListSubheader>}
          >
            {channels.map((channel, index) => {
              const { name, url } = channel;
              return (
                <div key={name + index.toString()}>
                  <Button onClick={this.handleClick(url)} className={button}>
                    {name}
                  </Button>
                </div>
              );
            })}
          </List>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ channels }) => {
  return {
    channels: channels
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ChannelList));
