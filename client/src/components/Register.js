import axios from 'axios';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { API_KEY, API_URL } from '../utils/data';

const Register = ( ) => {

  const [ stateName, updateStateName ] = useState( false );
  const [ stateEmail, updateStateEmail ] = useState( false );
  const [ stateUsername, updateStateUsername ] = useState( false );
  const [ statePassword, updateStatePassword ] = useState( false );

  const [ stateMessageData, updateStateMessageData ] = useState( false );
  const [ stateMessageStatus, updateStateMessageStatus ] = useState( false );

  const apiPostRegister = ( u, k, n, e, us, p ) => {
    axios.post( u, { name: n, email: e, username: us, password: p}, { headers: { 'x-api-key': k } } )
      .then( res => { 
        console.log( "response", res )
        updateStateMessageData ( `Data (Username) \t ${res.data.username}` ) 
        updateStateMessageStatus ( `Status Code \t ${res.status}` ) } )
      .catch( err => { 
        updateStateMessageData ( "" )
        updateStateMessageStatus ( "Sorry, that's an error" )
        } 
      )}

  const submitHandler = ( e ) => { 

    e.preventDefault()

    apiPostRegister ( API_URL + '/register', API_KEY , stateName, stateEmail, stateUsername, statePassword )

   }

  return (
  <Container fluid >
      <Row>
        <Col sm={4} className="m-3">
          <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter name" onChange={ e => updateStateName( e.target.value ) } />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter email" onChange={ e => updateStateEmail( e.target.value ) }/>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter Username" onChange={ e => updateStateUsername( e.target.value ) }/>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Password" onChange={ e => updateStatePassword( e.target.value ) }/>
            </Form.Group>

            <Button type="submit" >Register</Button>
          </Form>
       </Col>
       <Col sm={6} className="m-3">
          { stateMessageData && <Alert className="m-3" variant="primary">{ stateMessageData}</Alert> }
          { stateMessageStatus && <Alert className="m-3" variant="primary">{ stateMessageStatus }</Alert> }
       </Col>
      </Row>
  </Container>
  )
}

export default Register;