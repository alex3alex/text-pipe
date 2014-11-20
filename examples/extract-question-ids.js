'use strict';

/*!
 * imports.
 */

var map = require('..').map;
var select = require('..').select;

/*!
 * 1. creates a readable stream from file stackoverflow.txt.
 * 2. splits stream by line (like sed).
 * 3. selects lines that have a `question_id` heading -- drops non-matching lines.
 * 4. extracts the value for question_id.
 * 5. output result (newline separated) to stdout.
 */

require('fs').createReadStream(__dirname + '/stackoverflow.txt')
  // sed-like (i.e. split stream by line).
  .pipe(require('split')())

  // keep only `question_id` lines.
  .pipe(select(function (string) {
    return /^question_id:/.exec(string);
  }))

  // extract ID value.
  .pipe(map(function (string) {
    return /\d+/.exec(string)[0];
  }))

  // append newline character.
  .pipe(map(function (string) {
    return string + '\n';
  }))

  .pipe(process.stdout);
