var http = require("http");
var fs = require('fs')
var port = 8686;

var server = http.createServer(function (req, res) {
  // handle response
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.readFile('index.html', function (error, data) {
    if (error) {
      res.writeHead(404)
      res.write('Eroor: File Not Found')
    } else {
      res.write(data)
    }
    res.end()
  });

});

server.listen(port, function (error) {
  if (error) {
    console.log('Something went wrong' + error)
  } else {
    console.log('Server is listening on port' + port)
  }
});
console.log(`Serving on port ${port}`);