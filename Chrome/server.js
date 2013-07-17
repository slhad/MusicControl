var app = require("http").createServer(handler);
var io = require("socket.io").listen(app);

app.listen(8000);

function handler (req, res) {
    var startIndex = 1;
    var lastIndex = req.url.indexOf("?");
    if (lastIndex == -1) {
        res.writeHead(500);
        return res.end("Uncool URL");
    }
    var fileName = req.url.substring(startIndex, lastIndex); 
    var args = req.url.substring(lastIndex + 1, req.url.length);

    console.log(fileName, args);

    res.writeHead(200);
    res.end(fileName + ":" + args);

    console.log("Request received: ", fileName, args);

    if (extension) {
        console.log("Emitting to extension...");
        extension.emit(fileName, args);
    }
}

var extension; 

io.sockets.on("connection", function (socket) {

    console.log("onConnection...");
    console.log("extension registered");
    extension = socket;

});