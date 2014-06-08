'use strict';

var GomiCalJp = require('../lib/53cal-jp-scraper.js');
var assert = require('power-assert');
var nock = require('nock');

describe('gomiCalJpScraper', function () {
  var scraper;

  before(function(done){
    scraper = GomiCalJp({ city: '1130104', area: '1130104154' });
    done();
  });

  it('should be categories', function(done){
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140531.html');
    scraper.categories(function(data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154'});
      assert.deepEqual(data.result, ['燃やすごみ', '陶器・ガラス・金属ごみ','資源']);
      done();
    });
  });

  it('should be date and category in month', function(done){
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140601.html');
    scraper.dateAndCategoryInMonth(2014, 6, function(data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154', year: 2014, month: 6});
      assert.deepEqual(data.result[0], {'2014-06-01': null});
      assert.deepEqual(data.result[1], {'2014-06-02': '陶器・ガラス・金属ごみ'});
      assert.deepEqual(data.result[2], {'2014-06-03': '燃やすごみ'});
      assert.deepEqual(data.result[3], {'2014-06-04': null});
      done();
    });
  });

});
