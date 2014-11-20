'use strict';

/*!
 * imports.
 */

var map = require('..').map;
var select = require('..').select;
var reduce = require('..').reduce;

/*!
 * 1. creates a readable stream from file property-sales.txt.
 * 2. splits stream by line (like sed).
 * 3. NOTE: I'd recommend a CSV stream parser for a real program.
 * 4. splits the string on `,"` (assumes CSV is double-quoted and comma delimited) and checks that the fourth column includes the `quit claim` string.
 * 5. selects only 2012 records.
 * 6. extracts sale price.
 * 7. keeps only largest sale price.
 * 8. output result (newline separated) to stdout.
 */

require('fs').createReadStream(__dirname + '/property-sales.txt')
  // sed-like (i.e. split stream by line).
  .pipe(require('split')())

  // keep only `Quit Claim` sales.
  .pipe(select(function (string) {
    var type = string.split(/[,"]/).filter(String)[3];
    return /^quit claim/i.exec(type);
  }))

  // keep only `2012` sales.
  .pipe(select(function (string) {
    var year = string.split(/[,"]/).filter(String)[1].slice(0,4);
    return 2012 == year;
  }))

  // extract sale price.
  .pipe(map(function (string) {
    return string.split(/[,"]/).filter(String)[2];
  }))

  // output largest sale amount.
  .pipe(reduce(function(memo, val) {
    return Number(val) > Number(memo) ? val : memo;
  }, 0))

  // append newline character.
  .pipe(map(function (string) {
    return string + '\n';
  }))

  .pipe(process.stdout);
