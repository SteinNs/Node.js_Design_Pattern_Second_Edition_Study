const fs = require('fs');
const split = require('split');
const request = require('request');
const LimitedParallelStream = require('./limitedParallelStream');

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new LimitedParallelStream(2, (url, enc, done, push) => {
    if (!url) {
      return done();
    }
    request.head(url, (err, res) => {
      push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    })
  }))
  .on('error', (err) => {
    console.log(err);
  })
  .pipe(fs.createWriteStream('limitedResults.txt'))
  .on('finish', () => {
    console.log('checked');
  })

