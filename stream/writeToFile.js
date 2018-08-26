const ToFileStream = require('./toFileStream');
const tfs = new ToFileStream();
tfs.write({path:'file1.txt', content: 'Hello'});
tfs.write({path: 'file2.txt', content: 'Node.js'});
tfs.write({path: 'file3.txt',content: 'stream'});
tfs.end(()=>{
  console.log('all created');
})