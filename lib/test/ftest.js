'use strict';

var mock = require('mock-fs');

var ftest = function ftest(msg, files, test) {
  it(msg, function () {
    try {
      mock(files);
      test();
    } finally {
      mock.restore();
    }
  });
};

module.exports = ftest;