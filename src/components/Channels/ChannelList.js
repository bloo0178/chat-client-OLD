import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class ChannelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channels: []
        }
    }

    componentDidMount() {
        var openChannelListQuery = this.props.sb.OpenChannel.createOpenChannelListQuery();
        openChannelListQuery.next((channels, error) => {
            if (error) return console.log(error);
            this.setState({
                channels: channels
            })
        })
    }

    handleClick = channelURL => event => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(setChannelURL(channelURL));
        this.props.history.push(`/chat/${channelURL}`);
    }

    render() {
        return (
            <div>
                <h4>Join a Channel</h4>
                <List>
                    {this.state.channels.map((channel, index) => {
                        return (
                            <div>
                                <ListItem
                                    button
                                    key={channel.name + index.toString()}
                                    onClick={this.handleClick(channel.url)}>
                                    <ListItemText primary={channel.name} />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sb: state.sbsession.sbsession
    }
}

export default connect(mapStateToProps)(ChannelList);