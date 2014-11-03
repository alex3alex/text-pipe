# text-pipe

[![Build Status](http://img.shields.io/travis/wilmoore/text-pipe.svg)](https://travis-ci.org/wilmoore/text-pipe) [![NPM version](http://img.shields.io/npm/v/text-pipe.svg)](https://www.npmjs.org/package/text-pipe) [![NPM downloads](http://img.shields.io/npm/dm/text-pipe.svg)](https://www.npmjs.org/package/text-pipe) [![LICENSE](http://img.shields.io/npm/l/text-pipe.svg)](LICENSE)

> Transform stream generators for stream driven data extract and transformation.

    $ npm install text-pipe

## Examples

###### Extract Stackoverflow question IDs.

    % node examples/extract-question-ids.js
    26694200
    26598084

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

## Depends on

- [through2-filter]: You could use this directly if you want to write `{wantStrings: true}` boilerplate.
- [through2-map]: You could use this directly if you want to write `{wantStrings: true}` boilerplate.
- [through2]: You could use this directly if you want to write `write` and `end` boilerplate.

## License

  [MIT](LICENSE)

[through2-filter]: https://www.npmjs.org/package/through2-filter
[through2-map]: https://www.npmjs.org/package/through2-map
[through2]: https://www.npmjs.org/package/through2

