// Required modules
const io = require('socket.io-client');
// Check whether stream modules are same or not in sender and receiver
const socketStream = require('@sap_oss/node-socketio-stream');
const fs = require('fs');
// Connect to the server using connect function
const socket = io.connect('http://192.168.1.5:10000');
// Create a stream for the socket io
const stream = socketStream.createStream();
// Insert filename here in editor here for now
var filename = '';
// Cast socketio connection to socket.io-stream and emit the event
socketStream(socket).emit('Data', stream, {name: filename});
// Create readstream from the fs module and pipe to the socket stream
var readStream = fs.createReadStream(filename)
readStream.pipe(stream);
// Error handling for socket and readStream
readStream.on('error', (err) => {
  return console.error(err);
})

socket.on('error', (err) => {
  return console.error(err);
  process.exit(1);
})