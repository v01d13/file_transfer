const qr = require('qrcode');

exports.qr_generator = (ip) => {
  qr.toFile('qr_code.png', ip, (err) => {
  if (err) return console.error(err);
  console.log('QR code generated.')
  });
}