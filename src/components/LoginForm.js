import React, {Component} from 'react';
import { Form, FormGroup, FormControl, Row, Button } from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context)
    
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.handleUserLogin(document.getElementById('user-login').value);
    }

    render() {
        return (
            <Row className="text-center">
                <h1>Login</h1>
                <Form className="form-signin" inline onSubmit={this.handleSubmit}>
                    <FormGroup controlId="user-login">
                        <FormControl
                            type="text"
                            placeholder="Enter your username"
                            size={35}
                        />
                        <FormControl.Feedback />
                    </FormGroup>{' '}
                    <Button type="submit">Submit</Button>
                </Form>
            </Row>
        );
    }
}

export default LoginForm;