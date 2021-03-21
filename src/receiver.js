// Importing required modules
const http = require('http').createServer();
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');
var filename = null;
var buff = [];
// Connect event
io.on("connect", (socket) => {
    console.log('Connected');
    socket.on('hello', (data) => {
      console.log(data);
    });
    // Casting socketio ko socketio stream and receiving the stream and data about the file from the emit event
    socket.on('file', (chunk, fileName) => {
      console.log(`Receiving file: ${filename}`);
      filename = path.basename(fileName);
      buff.push(chunk);
    });
    socket.on('ending', (data) => {
      console.log(`${filename} writestream closed.`);
      var finalBuff = Buffer.concat(buff);
      fs.writeFile(filename, finalBuff, (err) => {
        if (err) return console.error(err);
          process.exit(1);
      });
    });
});
// Disconnect event
io.on('disconnect', () => {
  console.log('Disconnected')
});
// Server listening on
http.listen(10000, '192.168.1.5', () => {
  console.log(`Listening: ${http.address().address}`)
});
