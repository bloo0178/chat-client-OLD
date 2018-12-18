import React from 'react';
import { Collapse, Button, Badge } from 'reactstrap';


class Participants extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapse: true };
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if (this.props.participants) {
            return (
                <div>   
                    <h3>Active <Button size="sm" onClick={this.toggle}>Toggle</Button></h3>     
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
                    <h3>Active</h3>
                </div>
            )
        }
    }
}

export default Participants;