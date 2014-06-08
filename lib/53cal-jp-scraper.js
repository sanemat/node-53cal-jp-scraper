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

var request = require("request");
var cheerio = require("cheerio");

function GomiCalJp(opts, cb){
  opts = opts || {};
  if (typeof opts === 'function'){
    cb = opts;
    opts = {};
  }
  this.city = opts.city || '';
  this.area = opts.area || '';
}

GomiCalJp.prototype.categories = function(cb){
  var self = this;
  // http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154
  var requestUrl = 'http://www.53cal.jp/areacalendar/?city=' + this.city + '&area=' + this.area;
  request({url: requestUrl}, function(error, response, body){
    if (!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var gomiCategories = [];
      $('.side_city .side_box ul li').map(function(){  gomiCategories.push($(this).text()); });
      var data = {
        meta: {
          city: self.city,
          area: self.area
        },
        result: gomiCategories
      };
      cb(data);
    } else {
      console.log(error, response, body);
    }
  });
};

module.exports = function(opts, cb) {
  var s = new GomiCalJp(opts, cb);

  if (s.cb) { s.on('error', s.cb); }
  return s;
};

module.exports.GomiCalJp = GomiCalJp;
