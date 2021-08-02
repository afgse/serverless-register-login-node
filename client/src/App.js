import { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { userBeginSession , userResetSession } from './utils/session';
import { API_KEY, API_URL } from './utils/data';

import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {

  const [ stateLoggedIn , updateStateLoggedIn ] = useState ( false )

  useEffect ( ( ) => { 

    const tokenLocal = sessionStorage.getItem('token')
    const userLocal = sessionStorage.getItem('user')

    if ( tokenLocal === 'undefined' || tokenLocal === undefined || tokenLocal === null || !tokenLocal ) { return } 
    else if ( userLocal === 'undefined' || userLocal === undefined || userLocal === null || !userLocal ) { return } 

    axios.post ( API_KEY + '/verify' , { data: { user: userLocal , token: tokenLocal } } , { headers: { 'x-api-key': API_KEY } } )   
      .then( res => { 
        console.log ( res )
        userBeginSession ( res.data.user , res.data.token )
        updateStateLoggedIn ( true )
      } )
      .catch( err => { 
        console.log ( err ) 
        userResetSession() 
        updateStateLoggedIn ( false )
      } )
  }, [] );

  return (
    <Router>
      <Container>
        <Row className="m-3">
          <Header />
        </Row>
        <Row className="m-3">
          <Switch>
            <Route exact path="/"></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/register"><Register/></Route>
          </Switch>
        </Row>
        <Row className="m-3" >
            <Footer/>   
        </Row>
      </Container>
    </Router>
  )

}

export default App;
