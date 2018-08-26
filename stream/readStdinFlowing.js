process.stdin
  .on('data', chunk => {
    console.log('new data');
    console.log(`Chunk read:(${chunk.length}) "${chunk.toString()}"`)
  })