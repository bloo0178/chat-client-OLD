import React from 'react';
import ChannelList from './ChannelList';
import CreateChannel from './CreateChannel';

// Consider making this stateless functional component. 
// Only if not adding a loading state w/ spinner. 
class Channels extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="channels-wrapper">
                <div>
                    <ChannelList history={this.props.history} />
                </div>
                <div>
                    <CreateChannel />
                </div>
            </div >
        )
    }
}

export default Channels;