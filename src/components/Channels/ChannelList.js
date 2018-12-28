import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { clearMessages, setChannelURL } from '../../actions'

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
        this.props.history.push(`/chat/${event.target.id}`);
    }

    render() {
        return (
            <div>
                <h4>Join a Channel</h4>
                <ListGroup>
                    {this.state.channels.map((channel, index) => {
                        return (
                            <ListGroupItem
                                key={channel.name + index.toString()}
                                id={channel.url}
                                size="sm"
                                action
                                onClick={this.handleClick}>
                                {channel.name}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
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