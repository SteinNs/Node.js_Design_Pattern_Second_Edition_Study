const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  const filename = req.headers.filename;
  console.log(`file request received: ${filename}`);
  req
    .pipe(crypto.createDecipheriv('aes192','secret','matchsecret'))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on('error',(err) => {
      console.log(err)
    })
    .on('finish',() => {
      res.writeHead(201, {
        'Content-Type': 'text/plain'
      });
      res.end('That\'s it\n');
      console.log(`file saved:${filename}`);
    })
})

server.listen(3000, () => {console.log('listening')})