'use strict';

/*!
 * exports.
 */

exports.select = select;
exports.filter = select;
exports.keep = select;
exports.map = map;
exports.transform = map;
exports.reduce = reduce;
exports.fold = reduce;
exports.inject = reduce;

/**
 * for each value, return only values that pass a truth test.
 */

function select(test) {
  return require('through2-filter')({wantStrings: true}, test);
}

/**
 * for each value, return result of calling `transformer` function to given value.
 */

function map(transformer) {
  return require('through2-map')({wantStrings: true}, transformer);
}

/**
 * `Array.prototype.reduce` as a through stream.
 */

function reduce(transformer, initial) {
  return require('stream-reduce')(transformer, initial);
}

