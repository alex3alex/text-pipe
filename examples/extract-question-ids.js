'use strict';

/*!
 * imports.
 */

var map = require('..').map;
var select = require('..').select;

/*!
 * main.
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
