const stream = require('stream');
const util = require('util');

class ReplaceStream extends stream.Transform{
  constructor(searchString, replaceString){
    super();
    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = '';
  }

  _transform(chunk, encoding, callback){
    const pieces = (this.tailPiece + chunk )
      .split(this.searchString);
      console.log('PIECES:',pieces);
    const lastPiece = pieces[pieces.length - 1];
    console.log('lastPiece',lastPiece);

    const tailPieceLen = this.searchString.length;
    this.tailPiece = lastPiece.slice(-tailPieceLen);
    console.log('this.tailPiece',this.tailPiece)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);
    console.log('pieces',pieces);
    this.push(pieces.join(this.replaceString));
    console.log(pieces.join(this.replaceString));
    callback();
  }
  _flush(callback){
    this.push(this.tailPiece);
    callback();
  }
}

module.exports = ReplaceStream;
