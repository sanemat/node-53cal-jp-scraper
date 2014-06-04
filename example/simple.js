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

var gomiCalJpScraper = require('../');

gomiCalJpScraper.whatDay({ city: 1130104, area: 1130104154, date: '2014-06-04' }, function(err, data){
  data = '燃やすゴミ';
});

gomiCalJpScraper.categories({ city: 1130104, area: 1130104154 }, function(err, data){
  data = ['燃やすゴミ', '資源', '燃やさないゴミ'];
});

gomiCalJpScraper.mostRecentDate({ city: 1130104, area: 1130104154, date: '2014-06-04' }, function(err, data){
  data = [{ '燃やすゴミ': '2014-06-05' }, { '資源': '2014-06-06' }, { '燃やさないゴミ': '2014-06-07' }];
});

// http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154
// $('.today').find('#cal_kind a').text()
// http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6
//$('.today').find('#cal_kind a').length
//table.calbox の何番目のtdか
