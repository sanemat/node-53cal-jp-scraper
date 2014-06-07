/*
 * 53cal-jp-scraper
 * https://github.com/sanemat/node-53cal-jp-scraper
 *
 * Copyright (c) 2014 sanemat
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Following the 'Node.js require(s) best practices' by
 * http://www.mircozeiss.com/node-js-require-s-best-practices/
 *
 * // Nodejs libs
 * var fs = require('fs'),
 *
 * // External libs
 * debug = require('debug'),
 *
 * // Internal libs
 * data = require('./data.js');
 */

function GomiCalJp(opts, cb){
  opts = opts || {};
  if (typeof opts === 'function'){
    cb = opts;
    opts = {};
  }
}

GomiCalJp.prototype.categories = function(cb){
  var data = {
    meta: {city: '1130104', area: '1130104154'},
    result: []
  };
  cb(data);
};

module.exports = function(opts, cb) {
  var s = new GomiCalJp(opts, cb);

  if (s.cb) { s.on('error', s.cb); }
  return s;
};

module.exports.GomiCalJp = GomiCalJp;
