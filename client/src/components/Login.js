import axios from 'axios';
import { React, useState } from 'react';
import { Container, Row , Col, Form, Button, Alert } from 'react-bootstrap';
import { userBeginSession , userResetSession } from '../utils/session';
import { API_KEY, API_URL } from '../utils/data';

const Login = ( props ) => {

  const [ stateUsername, updateStateUsername ] = useState ( false )
  const [ statePassword, updateStatePassword ] = useState ( false )

  const [ stateMessageData, updateStateMessageData ] = useState ( false )
  const [ stateMessageToken, updateStateMessageToken ] = useState ( false )
  const [ stateMessageStatus, updateStateMessageStatus ] = useState ( false )


  const apiPostLogin = ( u, k, us, p ) => {
    axios.post( u, { username: us, password: p}, { headers: { 'x-api-key': k } } )
      .then( res => { 
        userBeginSession ( res.data.user , res.data.token )
        console.log( "response", res )
        updateStateMessageData ( `Data (Username) \t ${res.data.user}` ) 
        updateStateMessageToken ( `Token \t ${res.data.token}` )
        updateStateMessageStatus ( `Status Code \t ${res.status}` ) } )
      .catch( err => { 
        updateStateMessageData ( "" )
        updateStateMessageToken ( "" )
        updateStateMessageStatus ( "Sorry, that's an error" )
        } 
      )}

  const submitHandler = ( event ) => {

    event.preventDefault()

    apiPostLogin ( API_URL + '/login' , API_KEY , stateUsername, statePassword )

  }

  return (
    <Container fluid >
    <Row>
      <Col sm={4} className="m-3">
        <Form onSubmit={submitHandler}>

          <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Try 'default' " onChange={ e => updateStateUsername( e.target.value ) }/>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Try 'default' " onChange={ e => updateStatePassword( e.target.value ) }/>
          </Form.Group>

          <Button type="submit" >Login</Button>
        </Form>
     </Col>
     <Col sm={6} className="m-3">
        { stateMessageToken && <Alert className="m-3 text-truncate" variant="primary">{ stateMessageToken }</Alert> }
        { stateMessageStatus && <Alert className="m-3" variant="primary">{ stateMessageStatus }</Alert> }
     </Col>
    </Row>
</Container>
  )
}

export default Login;