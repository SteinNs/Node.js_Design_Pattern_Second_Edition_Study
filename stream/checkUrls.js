const fs = require('fs');
const split = require('split');
const request = require('request');
const ParallelStream = require('./parallelStream');

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new ParallelStream((url, enc ,done, push) => {
    if(!url){
      return done();
    }
    request.head(url, (err, res) => {
      push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    })
  }))
    .pipe(fs.createWriteStream('results.txt'))
    .on('finish', () => {
      console.log('checked');
    })
  