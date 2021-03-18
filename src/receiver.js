// Importing required modules
const http = require('http').createServer();
const io = require('socket.io')(http);
const ss = require('@sap_oss/node-socketio-stream');
const fs = require('fs');
const path = require('path');
// Connect event
io.on("connect", (socket) => {
  console.log('Connected');
  // Casting socketio ko socketio stream and receiving the stream and data about the file from the emit event
  ss(socket).on('Data', (stream, data) => {
    console.log('Above pipe');
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
    console.log('Below Pipe');
  });
  console.log('Outside on')
});
// Disconnect event
io.on('disconnect', () => {
  console.log('Disconnected')
})
// Server listening on
http.listen(10000, () => {
  console.log('Listening: ')
})