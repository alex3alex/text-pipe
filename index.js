'use strict';

/*!
 * exports.
 */

exports.select = select;
exports.filter = select;
exports.keep = select;
exports.map = map;
exports.transform = map;

/*!
 * imports.
 */

var filter = require('through2-filter');
var map = require('through2-map');

/**
 * for each value, return only values that pass a truth test.
 */

function select(test) {
  return filter({wantStrings: true}, test);
}

/**
 * for each value, return result of calling `transformer` function to given value.
 */

function map(transformer) {
  return map({wantStrings: true}, transformer);
}
