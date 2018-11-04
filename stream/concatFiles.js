const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(dest, files, callback){
  const destStream = fs.createWriteStream(dest);
  fromArray.obj(files)
    .pipe(through.obj((file, enc, done) => {
      const src = fs.createReadStream(file);
      src.pipe(destStream, {end: false});
      src.on('end', done);
    }))
    .on('finish', () => {
      destStream.end();
      callback();
    })
}

module.exports = concatFiles;