var filesMap = {};

var socket = chrome.socket;

var socketHttpId;
var socketInfo;


var extensionId;

var port = 8000;

function runServer() {

    chrome.runtime.onMessageExternal.addListener(
            function (request, sender, sendResponse) {
                if (request) {
                    if (request.id) {
                        console.log("extension registered");
                        extensionId = request.id;
                    }
                }
            });

    socket.create('tcp',
            function (socketInfoI) {
                socketHttpId = socketInfoI.socketId;
                socketInfo = socketInfoI;
                socket.listen(socketHttpId, '127.0.0.1', port, function (result) {
                    socket.accept(socketHttpId, onAccept);
                });
            });

    keepAlive();
}

function keepAlive() {

    setTimeout(keepAlive, 1000);
}

function onAccept(acceptInfo) {
    readFromSocket(acceptInfo.socketId);
}

var arrayBufferToString = function (buffer) {
    var str = '';
    var uArrayVal = new Uint8Array(buffer);
    for (var s = 0; s < uArrayVal.length; s++) {
        str += String.fromCharCode(uArrayVal[s]);
    }
    return str;
};

var stringToUint8Array = function (string) {
    var buffer = new ArrayBuffer(string.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < string.length; i++) {
        view[i] = string.charCodeAt(i);
    }
    return view;
};

var readFromSocket = function (socketId) {
    socket.read(socketId, function (readInfo) {
        var data = arrayBufferToString(readInfo.data);
        if (data.indexOf("GET ") === 0) {
            var keepAlive = false;
            if (data.indexOf("Connection: keep-alive") !== -1) {
                keepAlive = true;
            }
            var uriEnd = data.indexOf(" ", 4);
            if (uriEnd < 0) {
                return;
            }
            var uri = data.substring(4, uriEnd);

            var cmdPos = uri.indexOf("?");
            if (cmdPos === -1 || uri.indexOf("music") !== 1) {
                writeErrorResponse(socketId, 503, keepAlive, uri);
                console.log("command error : " + uri);
            } else {
                write200Response(socketId, keepAlive);
                uri = uri.substring(1);
                console.log("command : " + uri);

                var action = {
                    action: uri.substring(cmdPos)
                };
                if (extensionId) {
                    chrome.runtime.sendMessage(extensionId, action);
                } else {
                    console.error("An extension must be registered before sending commands");
                }
            }
        } else {
            socket.destroy(socketId);
        }
    });
};

var writeErrorResponse = function (socketId, errorCode, keepAlive, message) {
    var file = {
        size: 0
    };
    var contentType = "text/plain";
    var contentLength = file.size;
    var header = stringToUint8Array("HTTP/1.0 " + errorCode);
    var outputBuffer = new ArrayBuffer(header.byteLength + file.size);
    var view = new Uint8Array(outputBuffer);
    view.set(header, 0);
    socket.write(socketId, outputBuffer, function (writeInfo) {
        if (keepAlive) {
            readFromSocket(socketId);
        } else {
            socket.destroy(socketId);
            socket.accept(socketInfo.socketId, onAccept);
        }
    });
};

var write200Response = function (socketId, keepAlive) {
    var contentType = "text/plain";
    textsize = 0;
    var contentLength = textsize;
    var header = stringToUint8Array("HTTP/1.0 200 OK");
    var outputBuffer = new ArrayBuffer(header.byteLength + textsize);
    var view = new Uint8Array(outputBuffer);
    view.set(header, 0);
    socket.write(socketId, outputBuffer, function (writeInfo) {
        if (keepAlive) {
            readFromSocket(socketId);
        } else {
            socket.destroy(socketId);
            socket.accept(socketInfo.socketId, onAccept);
        }
    });
};

runServer();

chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('options.html', {
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
});