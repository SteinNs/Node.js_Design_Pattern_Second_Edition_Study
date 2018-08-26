const Chance = require('chance');
const chance = new Chance();
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  function generateMore(){
    while(chance.bool({
      likelihood: 95
    })){
      const shouldContiune = res.write(chance.string({
        length: (16 * 1024) - 1
      }));
      if(!shouldContiune){
        console.log('backpressure');
        return res.once('drain',generateMore);
      }
    }
    res.end('\nThe end...\n',() => console.log);
    res.on('finish', () => console.log('all data'))
    
  }
  generateMore();
}).listen(8080, () => console.log('listening'))