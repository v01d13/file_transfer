// Required modules
const io = require('socket.io-client');
const fs = require('fs');
// Connect to the server using connect function
const socket = io.connect('http://192.168.1.134:10000');

// Insert filename here in editor here for now
var filename ="ragnarok.mp4";
// 

socket.on('connect',(data)=>{
  // socket.emit('file',readStream)
  console.log('Connected.');
  var readStream = fs.createReadStream(filename);
  // readStream.setEncoding('utf8');
  readStream.on('data', (chunk) => {
    console.log(`Sending: ${filename}`);
    //Changing chunk file format to string for easier writing
    var chunkString = chunk.toString();
    //Emitting the string to the receiver
    socket.emit('file', chunkString, filename);
    })
    readStream.on('close',()=>{
      // Emitting the end of stream to the receiver
      console.log('Closing the stream');
      socket.emit('ending', 'close');
    })
    readStream.on('error', (err) => {
      return console.error(err);
    });
})

socket.on('error', (err) => {
  return console.error(err);
})
