const AWS    = require('aws-sdk');
const bcrypt = require('bcryptjs');
const util   = require('../utils/util');

AWS.config.update({ region: 'us-east-1' })

const database = new AWS.DynamoDB.DocumentClient();


async function register( user ) {

  const newUserName     = user.name;  
  const newUserEmail    = user.email; 
  const newUserUsername = user.username; 
  const newUserPassword = user.password;
  
  // Create a new user if the form is valid
  if ( !newUserUsername || !newUserName || !newUserEmail|| !newUserPassword ) 
    { return util.sendResponse(401, { message: 'All fields required' })}

  // Encrypt the password           
  const passwordEncrypted = bcrypt.hashSync( newUserPassword.trim(), 10 );  
  
  const newUser = { name:     newUserName, 
                    email:    newUserEmail, 
                    username: newUserUsername.toLowerCase().trim(), 
                    password: passwordEncrypted } 
  
  
  // Check database for existing username
  const serviceUserDatabase = await getUser( newUserUsername.toLowerCase().trim() ); 

  if ( serviceUserDatabase && serviceUserDatabase.username) 
    { return util.sendResponse(401, { message: 'Please choose a different username' })}

  // Test service
  const serviceResponse = await saveUser( newUser );                    
  
  if ( !serviceResponse ) 
    { return util.sendResponse(503, { message: 'Server Error. Please try again later.'});}

  return util.sendResponse(200, { username: newUserUsername });
}

async function getUser( username ) {

  // Prepare body and process GET request
  const temp = { TableName: 'serverless-api', Key: { username: username } }

  return await database.get( temp )
                       .promise()
                       .then(res => { return res.Item; }, 
                             err => { console.error('There is an error getting user: ', err); });
}

async function saveUser( item ) {

  // Prepare body and process PUT request
  const temp = { TableName: 'serverless-api', Item: item }

  return await database.put( temp )
                       .promise()
                       .then( ( ) => { return true; },  
                              err => { console.error('There is an error saving user: ', err)});
}

module.exports.register = register;