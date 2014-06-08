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

GomiCalJp.prototype.dateAndCategoryInMonth = function(year, month, cb) {
  var self = this;
  this.year = year;
  this.month = month;
  // http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6
  var requestUrl = 'http://www.53cal.jp/areacalendar/?city=' + this.city + '&area=' + this.area + '&yy=' + this.year + '&mm=' + this.month;
  request({url: requestUrl}, function(error, response, body){
    if (!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var dateAndCategory = [];
      $('.calbox td')
        .filter(function(){
          return $(this).find('img').length > 0;
        })
        .map(function(){
          var imageSrc = $(this).find('img').attr('src');
          var day = (imageSrc.match(/(\d+)/)||[])[1]|| null;
          var key = self.year + '-' + self.month + '-' + day;// TODO: Use sprintf
          var value = $(this).find('a').attr('title') || null;
          var box = {};
          box[key] = value;
          dateAndCategory.push(box);
        });
      var data = {
        meta: {
          city: self.city,
          area: self.area,
          year: self.year,
          month: self.month
        },
        result: dateAndCategory
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
