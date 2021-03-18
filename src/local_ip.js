//importing os module
const os = require('os');

exports.localIp = () => {
  //getting all the network interfaces of the machine
  let interfaces = os.networkInterfaces();
  let addresses = [];
  for (let i in interfaces) {
    for (let j in interfaces[i]) {
      let address = interfaces[i][j];
      /*checking whether the address is ipv4 or not and also
      whether the ip address is internal ip/local host of the machine*/
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
}