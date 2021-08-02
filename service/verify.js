const util = require('../utils/util');
const auth = require('../utils/auth');

function verify( requestBody ) {

  // Check if the request body is valid
  if ( !requestBody.user || !requestBody.user.username || !requestBody.token) {
    return util.sendResponse(401, {  verified: false, message: 'incorrect request body' })}

  const user  = requestBody.user;
  const token = requestBody.token;

  // Verify the user
  const verification = auth.webTokenVerify(user.username, token);
  if ( !verification.verified ) { return util.sendResponse(401, verification); }

  return util.sendResponse(200, 
    { verified: true, message: 'success', user: user, token: token } )
}

module.exports.verify = verify;