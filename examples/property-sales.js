'use strict';

/*!
 * imports.
 */

var map = require('..').map;
var select = require('..').select;
var reduce = require('..').reduce;

/*!
 * main.
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
