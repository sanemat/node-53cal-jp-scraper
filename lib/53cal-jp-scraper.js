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
var sprintf = require("sprintf-js").sprintf;
var pad = require('pad');
var moment = require('moment');

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
  var requestUrl = sprintf('http://www.53cal.jp/areacalendar/?city=%s&area=%s', this.city, this.area);
  request({url: requestUrl}, function(error, response, body){
    if (!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var gomiCategories = [];
      $('.side_city .side_box ul li').map(function(){  gomiCategories.push($(this).text()); });
      var cityName = $('#breadcrumbs a:last-child').text();
      var areaName =  ($('#breadcrumbs').text().match(/＞\s([^＞]*)のクリーンカレンダー/)||[])[1] || null;
      var data = {
        meta: {
          city: self.city,
          area: self.area,
          cityName: cityName,
          areaName: areaName
        },
        result: gomiCategories
      };
      cb(null, data);
    } else {
      console.log(error, response, body);
      cb(error, null);
    }
  });
};

GomiCalJp.prototype.dateAndCategoryInMonth = function(year, month, cb) {
  var self = this;
  this.year = year;
  this.month = month;
  // http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6
  var requestUrl = sprintf('http://www.53cal.jp/areacalendar/?city=%s&area=%s&yy=%s&mm=%s', this.city, this.area, this.year, this.month);
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
          var key = sprintf('%s-%s-%s', self.year, pad(2, self.month, 0), pad(2, day, 0));
          var value = $(this).find('a').attr('title') || null;
          var box = {};
          box[key] = value;
          dateAndCategory.push(box);
        });
      var cityName = $('#breadcrumbs a:last-child').text();
      var areaName =  ($('#breadcrumbs').text().match(/＞\s([^＞]*)のクリーンカレンダー/)||[])[1] || null;
      var data = {
        meta: {
          city: self.city,
          area: self.area,
          year: self.year,
          month: self.month,
          cityName: cityName,
          areaName: areaName
        },
        result: dateAndCategory
      };
      cb(null, data);
    } else {
      console.log(error, response, body);
      cb(error, null);
    }
  });
};

GomiCalJp.prototype.whatDate = function(dateString, cb) {
  var self = this;
  var day = moment(dateString);
  self.year = day.year();
  self.month = day.month() + 1;
  self.date = day.date();
  self.day = day;
  self.dateAndCategoryInMonth(self.year, self.month, function(err, callback){
    var needle = self.day.format('YYYY-MM-DD');
    var value = callback.result.filter(function(hash){ return Object.keys(hash)[0] === needle; }).shift();
    var data = {
      meta: {
        city: self.city,
        area: self.area,
        cityName: callback.meta.cityName,
        areaName: callback.meta.areaName
      },
      result: value
    };
    cb(null, data);
  });
};

module.exports = function(opts, cb) {
  var s = new GomiCalJp(opts, cb);

  if (s.cb) { s.on('error', s.cb); }
  return s;
};

module.exports.GomiCalJp = GomiCalJp;
