// requestServer.js file
const http = require("http");
const request = require("request");

const port = 3000;

var args = process.argv.slice(2);

const server = http.createServer(function (req, res) {
    var url = args[0] ? args[0] : "http://wilsuriel03.github.io";
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(body);
        }
        else {
            res.writeHead(200, { 'content-type': 'text/plain' })
            res.write(error.toString());
        }
        res.end()
    
    });
   
});
server.listen(port);
console.log(`Serving on port ${port}`);


