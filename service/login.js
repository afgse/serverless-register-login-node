const AWS    = require('aws-sdk');
const bcrypt = require('bcryptjs');
const util   = require('../utils/util');
const auth   = require('../utils/auth');

AWS.config.update({ region: 'us-east-1' })

const database = new AWS.DynamoDB.DocumentClient();

async function login(user) {
  
  const username = user.username;
  const password = user.password;
 
  const userDatabase = await getUser(username.toLowerCase().trim());
   
  const userInfo = { username: userDatabase.username, name: userDatabase.name}
  
  const token = auth.webTokenGenerate(userInfo)
  
  const response = { user: userInfo, token: token }
  
  if ( !user || !username || !password) {
    return util.sendResponse(401, { message: 'username and password are required' })}
  
if ( !userDatabase || !userDatabase.username) {
    return util.sendResponse(403, { message: 'user does not exist'});}

  if ( !bcrypt.compareSync(password, userDatabase.password)) {
    return util.sendResponse(403, { message: 'password is incorrect'});}
  
  return util.sendResponse(200, response);
};

async function getUser(username) {

  const params = { TableName: 'serverless-api', Key: { username: username }};

  return await database.get(params)
                       .promise()
                       .then(response => { return response.Item; },
                                error => { console.error('There is an error getting user: ', error); })
};

module.exports.login = login;