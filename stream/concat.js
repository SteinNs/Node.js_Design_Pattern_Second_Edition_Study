const concatFiles = require('./concatFiles');

concatFiles(process.argv[2], process.argv.slice(3), () => {
  console.log('finish');
})