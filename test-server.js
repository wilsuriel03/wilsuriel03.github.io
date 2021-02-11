var http = require("http");
var port = 8686;

http.createServer(function(req,res){
  // handle response
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Hey beautiful , would you like to be my  ');
  res.end('Valentines!!!');
}).listen(port);