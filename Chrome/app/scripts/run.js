var filesMap = {};

var socket = chrome.socket;

var socketHttpId;
var socketInfo;

function runServer(){
socket.create('tcp',
	function(socketInfoI) {
		socketHttpId = socketInfoI.socketId;
		socketInfo=socketInfoI;
		socket.listen(socketHttpId,'127.0.0.1',8000,function(result){
		socket.accept(socketHttpId,onAccept);
		});		
		});
}

function onAccept(acceptInfo){
	readFromSocket(acceptInfo.socketId);
}
			
var arrayBufferToString = function(buffer) {
    var str = '';
    var uArrayVal = new Uint8Array(buffer);
    for(var s = 0; s < uArrayVal.length; s++) {
      str += String.fromCharCode(uArrayVal[s]);
    }
    return str;
  };
  
var stringToUint8Array = function(string) {
var buffer = new ArrayBuffer(string.length);
var view = new Uint8Array(buffer);
for(var i = 0; i < string.length; i++) {
  view[i] = string.charCodeAt(i);
}
return view;
};
  
var readFromSocket = function(socketId) {
socket.read(socketId, function(readInfo) {
  var data = arrayBufferToString(readInfo.data);
  if(data.indexOf("GET ") == 0) {
	var keepAlive = false;
	if (data.indexOf("Connection: keep-alive") != -1) {
	  keepAlive = true;
	}
	var uriEnd =  data.indexOf(" ", 4);
	if(uriEnd < 0) { return; }
	var uri = data.substring(4, uriEnd);

	console.log("log url : "+uri);

	if (uri.indexOf("?")==-1){
		writeErrorResponse(socketId, 503, keepAlive, uri);
	}
	else{
		write200Response(socketId, keepAlive);
	}
  }
  else {
	socket.destroy(socketId);
  }
});
};
  
var writeErrorResponse = function(socketId, errorCode, keepAlive,message) {
	var file = { size: 0 };
	var contentType = "text/plain";
	var contentLength = file.size;
	var header = stringToUint8Array("HTTP/1.0 " + errorCode );
	var outputBuffer = new ArrayBuffer(header.byteLength + file.size);
	var view = new Uint8Array(outputBuffer)
	view.set(header, 0);
	socket.write(socketId, outputBuffer, function(writeInfo) {
	  if (keepAlive) {
		readFromSocket(socketId);
	  } else {
		socket.destroy(socketId);
		socket.accept(socketInfo.socketId, onAccept);
	  }
	});
	console.info("error command : "+message);
};


  var write200Response = function(socketId, keepAlive) {
    var contentType = "text/plain" ;
    textsize = 0;
	var contentLength = textsize;
    var header = stringToUint8Array("HTTP/1.0 200 OK");
    var outputBuffer = new ArrayBuffer(header.byteLength + textsize);
    var view = new Uint8Array(outputBuffer)
    view.set(header, 0);
    socket.write(socketId, outputBuffer, function(writeInfo) {
	  if (keepAlive) {
		readFromSocket(socketId);
	  } else {
		socket.destroy(socketId);
		socket.accept(socketInfo.socketId, onAccept);
	  }
	});
	console.info("valid command");
  };
			
runServer();