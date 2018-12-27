import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

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

    handleSelect = (event) => {
        this.props.setSelectedChannel(event.target.id);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.channels.map((channel, index) => {
                        return (
                            <li key={channel.name + index.toString()}>
                                {/*<Link
                                    to={{
                                        pathname: `/chat/${channel.url}`
                                    }}
                                    onClick={this.handleClick}
                                    id={channel.url}>
                                    {channel.name}
                                </Link>*/}
                                <Button size="sm" onClick={this.handleSelect} id={channel.url}>
                                    {channel.name}
                                </Button>
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