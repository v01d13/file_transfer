// Required modules
const io = require('socket.io-client');
const socketStream = require('socket.io-stream');
const fs = require('fs');
// Connect to the server using connect function
const socket = io.connect('');
// Create a stream for the socket io
const stream = socketStream.createStream();
// Insert filename here in editor here for now
var filename = '';
// Cast socketio connection to socket.io-stream and emit the event
socketStream(socket).emit('Data', stream, {name: filename});
// Create readstream from the fs module and pipe to the socket stream
fs.createReadStream(filename).pipe(stream);