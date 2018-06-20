import React, {Component} from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Panel, Well } from 'react-bootstrap';

class Room extends Component {
    constructor(props) {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.handleNewMessage(document.getElementById('user-message').value);
        document.getElementById('user-message').value = ''
    }

    render() {
        const {
            currentUser,
            connectedUsers,
            history
        } = this.props
        return (
            <Row className="room-container">
                <Col xs={8} className="room-chat">
                    <Panel>
                        <Panel.Heading>
                            <strong>Channel messages</strong>
                        </Panel.Heading>
                        <Panel.Body>
                            <Well>
                                <ul className="messages-list">
                                    { history && history.map( (message, i) => (
                                        <li key={i}>
                                            <strong>{message.user}:</strong>{' '}{message.msg}
                                        </li>
                                    ))}
                                </ul>
                            </Well>
                            <Row className="chat-form">
                                <Form className="message-form" onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="user-message">
                                        <ControlLabel>{currentUser}</ControlLabel>{' '}
                                        <FormControl
                                            type="text"
                                            placeholder="Type something..."
                                        />
                                    </FormGroup>
                                </Form>     
                            </Row>
                        </Panel.Body>
                    </Panel>
                </Col>
                <Col xs={4} className="connected-users">
                    <Panel bsStyle="success">
                        <Panel.Heading>
                            <strong>Connected users</strong>
                        </Panel.Heading>
                        <Panel.Body>
                            <ul className="users-list">
                                {connectedUsers && connectedUsers.map( (user, i) => (
                                    <li key={i}>{user}</li>
                                ))}
                            </ul>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default Room;