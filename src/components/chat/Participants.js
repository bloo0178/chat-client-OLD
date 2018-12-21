import React from 'react';
import { Collapse, Button, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            icon: 'minus', 
        };
    }

    toggle = () => {
        if (this.state.collapse === true) {
            this.setState({ icon: 'plus' })
        } else { this.setState({ icon: 'minus' }) }
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if (this.props.participants) {
            return (
                <div className="participants">
                    <h4>Active <FontAwesomeIcon size="xs" onClick={this.toggle} icon={this.state.icon} /></h4>
                    <Collapse isOpen={this.state.collapse}>
                        <ul>
                            {this.props.participants.map((participant, index) => {
                                return (
                                    <li key={participant + index.toString()}>{participant}</li>
                                )
                            })}
                        </ul>
                    </Collapse>
                </div>
            )
        } else {
            return (
                <div>
                    <h4>Active</h4>
                </div>
            )
        }
    }
}

export default Participants;


/*
Move handlers here.
Use getMessage to add message when user joins or leaves. (or sendMessage)
*/

/*console.dir(user.userId);
// this isn't working
var i = this.state.participants.indexOf(user.userId);
var userArrCopy = [...this.state.participants];
console.log('userArrCopy - Before');
console.log(userArrCopy);
userArrCopy.splice(i, 1);
console.log('userArrCopy - After');
console.log(userArrCopy);
this.setState({ participants: userArrCopy })*/