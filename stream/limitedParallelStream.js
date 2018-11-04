const stream = require('stream');

class LimitedParallelStream extends stream.Transform {
  constructor(concurrency, userTransform) {
    super({ objectMode: true });
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this._onComplete.bind(this), this.push.bind(this));
    // done()
    if (this.running < this.concurrency) {
      done();
    } else {
      this.continueCallback = done;
    }
  }
  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }
  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error',err);
    }
    console.log(this.running);
    const tmpCallback = this.continueCallback;
    this.continueCallback = null;
    tmpCallback && tmpCallback();
    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}
module.exports = LimitedParallelStream;
