process.stdin
  .on('readable',() => {
    let chunk;
    console.log('new data avaliable');
    while((chunk = process.stdin.read())!== null){
      console.log(
        `Chunk read: (${chunk.length})"${chunk.toString()}"`
      )
    }
  })
  .on('end', () => process.stdout.write('end'))