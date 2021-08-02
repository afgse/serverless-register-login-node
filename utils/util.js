function sendResponse(status, body) {
  return {
    statusCode: status,
    headers: { 'Access-Control-Allow-Origin' : '*', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}}

exports.sendResponse = sendResponse;