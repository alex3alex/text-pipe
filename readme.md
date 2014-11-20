# text-pipe

[![Build Status](http://img.shields.io/travis/wilmoore/text-pipe.svg)](https://travis-ci.org/wilmoore/text-pipe) [![NPM version](http://img.shields.io/npm/v/text-pipe.svg)](https://www.npmjs.org/package/text-pipe) [![NPM downloads](http://img.shields.io/npm/dm/text-pipe.svg)](https://www.npmjs.org/package/text-pipe) [![LICENSE](http://img.shields.io/npm/l/text-pipe.svg)](license)

> Transform stream [enumeratee][enumeratees] generators for stream-driven data extract and transformation (i.e. ETL).

    $ npm install text-pipe

###### text-pipe is a node module that includes functions for creating [enumeratees] (i.e. map, reduce) that serve as transform streams. This allows you to iteratively compose complex data processing workflows via simple map, reduce, and filter-like functions. Check out the [examples folder](https://github.com/wilmoore/text-pipe/blob/master/examples/) for working code samples. In order to run the code samples, you must do the following:

    % git clone https://github.com/wilmoore/text-pipe.git
    % cd text-pipe
    % npm install
    % cd examples
    % cat stackoverflow.txt
    % node extract-question-ids

###### NOTE: read the comments and the code in the examples to get a feel for how it works.

## API

###### .map

> aliases: .transform

For each value, return result of calling `transformer` function to given value.

    var transform = map(function transformer(string) {
      return /\d+/.exec(string)[0];
    });

    stream.pipe(transform);

###### .select

> aliases: .filter, .keep

For each value, return only values that pass a truth test.

    var transform = select(function (string) {
      return /^question_id:/.exec(string);
    });

    stream.pipe(transform);

###### .reduce

> aliases: .fold, .inject

`Array.prototype.reduce` as a through stream.

    var max = reduce(function(memo, val) {
      return Number(val) > Number(memo) ? val : memo;
    }, 0)

    stream.pipe(max);

## Depends on

- [stream-reduce]
- [through2-filter]: You could use this directly if you want to write `{wantStrings: true}` boilerplate.
- [through2-map]: You could use this directly if you want to write `{wantStrings: true}` boilerplate.
- [through2]: You could use this directly if you want to write `write` and `end` boilerplate.

## License

  [MIT](license)

[through2-filter]: https://www.npmjs.org/package/through2-filter
[through2-map]: https://www.npmjs.org/package/through2-map
[through2]: https://www.npmjs.org/package/through2
[stream-reduce]: https://www.npmjs.org/package/stream-reduce
[enumeratees]: http://en.wikipedia.org/wiki/Iteratee#Enumeratees
