const jwt = require('jsonwebtoken');

function webTokenGenerate( userInfo ) {

  // Check is use object valid
  if ( !userInfo ) { return null; }

  // Sign secret key with private enviroment variable (set on aws)
  return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h'})
  
}

function webTokenVerify( username, token ) {

  return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {

      // Check for valid user
      if (error) { return { verified: false, message: 'invalid token'}}
      if (response.username !== username) { return { verified: false, message: 'invalid user'}}
      
      return { verified: true, message: 'verifed' }})
}

exports.webTokenGenerate = webTokenGenerate
exports.webTokenVerify   = webTokenVerify 

