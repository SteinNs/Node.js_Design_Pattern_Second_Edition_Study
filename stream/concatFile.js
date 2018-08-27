const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback){
  const destStream = fs.createWriteStream(destination);
  fromArray.obj()
}