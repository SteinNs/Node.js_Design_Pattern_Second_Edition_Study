const child_process = require('child_process');
const net = require('net');

function multiplexChannels(sources, destination){
  let totalChannels = sources.length;

  for(let i = 0; i < sources.length; i++){
    sources[i]
      .on('readable', function(){
        let chunk;
        while((chunk = this.read()) !== null){
          console.log(chunk);
          const outBuff = new Buffer(1 + 4 + chunk.length);
          outBuff.writeUInt8(i, 0);
          outBuff.writeUInt32BE(chunk.length, 1);
          chunk.copy(outBuff,5);
          console.log(`sending to channel ${i}`);
          destination.write(outBuff);

        }
      })
      .on('end', () => {
        if(--totalChannels === 0){
          destination.end()
        }
      })
  }
}

const socket = net.connect(3000, () => {
  const child = child_process.fork(
    process.argv[2],
    process.argv.slice(3),{
      silent: true
    }
  );
  multiplexChannels([child.stdout, child.stderr], socket);
})