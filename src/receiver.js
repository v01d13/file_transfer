// Importing required modules
const http = require('http').createServer();
const io = require('socket.io')(http);
// Check whether stream modules are same or not in sender and receiver
const ss = require('@sap_oss/node-socketio-stream');
const fs = require('fs');
const path = require('path');
// Connect event
io.on("connect", (socket) => {
  console.log('Connected');
  // Casting socketio ko socketio stream and receiving the stream and data about the file from the emit event
    ss(socket).on('file', (stream, data, err) => {
      if(err) return console.error(err);
      console.log('Receiving file.');
      var filename = path.basename(data.name);
      var writeStream = fs.createWriteStream(filename);
      stream.pipe(writeStream);
      console.log('File received.');
      writeStream.on('error', (err) => {
        return console.error (err);
      });
    });
  console.log('Outside on');
});
// Server listening on
http.listen(8888, '192.168.1.92', () => {
  console.log(`Listening : ${http.address().address}:${http.address().port}`)
});