const fs = require('fs');
const compressAndEncryptStream = require('./combinedStreams').compressAndEncrypt;
fs.createReadStream(process.argv[3])
  .pipe(compressAndEncryptStream(process.argv[2]))
  .pipe(fs.createWriteStream(process.argv[3]+ '.gz.enc'))
  .on('error', err => {
    console.log(err);
  })

  