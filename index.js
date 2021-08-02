const serviceRegister = require('./service/register'); 
const serviceLogin    = require('./service/login');    
const serviceVerify   = require('./service/verify');   
const utilities       = require('./utils/util'); 

const pathServiceHealth   = '/health';   
const pathServiceRegister = '/register'; 
const pathServiceLogin    = '/login';    
const pathServiceVerify   = '/verify';   

exports.handler = async (event) => {

    console.log('Request Event: ', event);

    let response; 

    // Process HTTP requests
    switch(true) {
        
        // Process GET request at HEALTH endpoint
        case event.httpMethod === 'GET' && event.path === pathServiceHealth:
            response = utilities.sendResponse(200);
            break;

        // Process POST request at REGISTER endpoint
        case event.httpMethod === 'POST' && event.path === pathServiceRegister:
            const responseRegisterBody= JSON.parse(event.body) 
            response = await serviceRegister.register(responseRegisterBody)
            break;

        // Process POST request at LOGIN endpoint
        case event.httpMethod === 'POST' && event.path === pathServiceLogin:
            const responseLoginBdy = JSON.parse(event.body);
            response = await serviceLogin.login(responseLoginBdy);
            break;

        // Process POST request at VERIFY endpoint
        case event.httpMethod === 'POST' && event.path === pathServiceVerify:
            const responseVerifyBody = JSON.parse(event.body);
            response = serviceVerify.verify(responseVerifyBody);
            break;

        default:
            response = utilities.sendResponse(404, '404 Not Found');
    }
    return response;
};
