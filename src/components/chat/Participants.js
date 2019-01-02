import React from 'react';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            icon: 'minus',
            participantList: []
        };
    }

    toggle = () => {
        if (this.state.collapse === true) {
            this.setState({ icon: 'plus' })
        } else { this.setState({ icon: 'minus' }) }
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        let participantListQuery = this.props.channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
            if (error) return console.log(error);
            // Create an array of userId's pulled from each participant object.
            let list = [];
            participantList.map((participant) => {
                list.push(participant.userId);
            })
            this.setState({ participantList: list })
        })
    }

    render() {
        return (
            <div className="participants">
                <h4>Active <FontAwesomeIcon size="xs" onClick={this.toggle}
                    icon={this.state.icon} />
                </h4>
                <Collapse isOpen={this.state.collapse}>
                    <ul>
                        {this.state.participantList.map((participant, index) => {
                            return (
                                <li key={participant + index.toString()}>{participant}</li>
                            )
                        })}
                    </ul>
                </Collapse>
            </div>
        )
    }

}

export default Participants;