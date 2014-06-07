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

var gomiCalJp = require('../');
var scraper = gomiCalJp({city: '1130104', area: '1130104154'});

scraper.whatDate('2014-06-04', function(data){
  data = {
    meta: {
      city: '1130104',
      area: '1130104154'
    },
    result: {
      '2014-06-04': '燃やすゴミ'
    }
  };
});

scraper.categories(function(data){
  data = {
    meta: {
      city: '1130104',
      area: '1130104154'
    },
    result: [
      '燃やすゴミ',
      '資源',
      '燃やさないゴミ'
    ]
  };
});

scraper.mostRecentDate('2014-06-04', function(data){
  data = {
    meta: {
      city: '1130104',
      area: '1130104154'
    },
    result: [
      { '2014-06-05': '燃やすゴミ' },
      { '2014-06-06': '資源' },
      { '2014-06-07': '燃やさないゴミ' }
    ]
  };
});

scraper.dateAndCategoryInMonth(2014, 6, function(data){
  data = {
    meta: {
      city: '1130104',
      area: '1130104154',
      year: 2014,
      month: 6
    },
    result: [
      { '2014-06-05': '燃やすゴミ' },
      { '2014-06-06': '資源' },
      { '2014-06-07': '燃やすゴミ' },
      { '2014-06-08': '燃やさないゴミ' }
    ]
  };
});

gomiCalJp.cities(function(data){
  data = {
    meta: {
      key: 'city'
    },
    result: [
      { '1430301': '熊本市' },
      { '1450101': '宮崎県北部' }
    ]
  };
});

gomiCalJp.areas('1130104', function(data){
  data = {
    meta: {
      city: '1130104',
      key: 'area'
    },
    result: [
      { '1234567890': '大和町' }
    ]
  };
});

// http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154
// $('.today').find('#cal_kind a').text()
// http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6
//$('.today').find('#cal_kind a').length
//table.calbox の何番目のtdか
