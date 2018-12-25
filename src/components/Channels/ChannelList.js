/* 
This component could probably be 
segmented off into the channel list,
create channel, join channel, etc.
*/

import React from 'react';
import { connect } from 'react-redux';
import { clearMessages, setChannelURL } from '../../actions'
import { BrowserRouter as Router, Link } from 'react-router-dom';

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

    handleClick = (event) => {
        this.props.dispatch(clearMessages());
        this.props.dispatch(setChannelURL(event.target.id));
        // Need to assign the channel URL to the Redux store possibly... TBD
        //need to join the new channel here and mount the listeners. As well as exiting the old channel.
    }

    render() {
        console.log(this.state.channels);
        return (
            <div>
                <ul>
                    {this.state.channels.map((channel, index) => {
                        return (
                            <li key={channel.name + index.toString()}>
                                <Link
                                    to={{
                                        pathname: `/chat/${channel.url}`
                                    }}
                                    onClick={this.handleClick}
                                    id={channel.url}>
                                    {channel.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
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