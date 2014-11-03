'use strict';

/*!
 * imports.
 */

var test = require('tape');
var map = require('./').map;
var select = require('./').select;
var fs = require('fs');
var split = require('split');
var through = require('through');

/**
 * Whether given string matches pattern.
 */

function predicate(string) {
  return /^question_id:/.exec(string);
}

/*!
 * cases.
 */

test('select', function (t) {
  t.plan(1);

  var actual = '';
  var expected ='question_id: 26694200question_id: 26598084';

  function write(data) {
    actual += data;
  }

  function end() {
    t.equal(actual, expected);
    this.queue(null);
  }

  fs.createReadStream('./examples/stackoverflow.txt')
    .pipe(split())
    .pipe(select(predicate))
    .pipe(through(write, end));
});

test('map', function (t) {
  t.plan(1);

  var actual = 0;
  var expected = 53292284;

  function number(string) {
    return /\d+/.exec(string)[0]
  }

  function write(data) {
    actual += Number(data);
  }

  function end() {
    t.equal(actual, expected);
    this.queue(null);
  }

  fs.createReadStream('./examples/stackoverflow.txt')
    .pipe(split())
    .pipe(select(predicate))
    .pipe(map(number))
    .pipe(through(write, end));
});
