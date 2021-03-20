// Required modules
const io = require('socket.io-client');
// Check whether stream modules are same or not in sender and receiver
const ss= require('@sap_oss/node-socketio-stream');
const fs = require('fs');
// Connect to the server using connect function
const socket = io.connect('http://192.168.1.101:8888');

// Create a stream for the socket io
const stream = ss.createStream();
// Insert filename here in editor here for now
var filename ="/home/flutterdev/Programming/FlutterApp/file_transfer/src/flutterautomate.mp4";
// Cast socketio connection to socket.io-stream and emit the event
ss(socket).emit('file', stream, {name: filename});
// Create readstream from the fs module and pipe to the socket stream

// readStream.pipe(stream);
// Error handling for socket and readStream


socket.on('connect',(data)=>{
  socket.emit("msg","Hello from pc")
  // socket.emit('file',readStream)
  console.log("The connection is successful")
var readStream = fs.createReadStream(filename)
// readStream.setEncoding('utf8');
readStream.on('data',(chunk)=>{
  socket.emit('file',chunk)
console.log("THe chunk is ",chunk)
})
readStream.on('close',()=>{
  console.log("NOw closing the stream")
  // socket.emit('close',"close");
})
readStream.on('error', (err) => {
  return console.error(err);
})
})

socket.on('error', (err) => {
  return console.error(err);
  process.exit(1);
})