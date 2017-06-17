var http = require('http');

// Define the server and specify its request handling.
var server = http.createServer(function(request, response) {

  // Collect the request data.
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];

  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
  });

  // Set the response data.
  response.on('error', function(err) {
    console.error(err);
  })

  response.statusCode = 200;

  if (method === 'GET' && url === '/echo') {
    response.setHeader('Content-Type', 'application/json');
    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };
    response.write(JSON.stringify(responseBody));
  } else {
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<body>');
    response.write('<h1>Hello World!</h1>');
    response.write('</body>');
    response.write('</html>');
  }

  response.end();

});

// Activate the server.
server.listen(8080);
