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
    scraper.categories(function(err, data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154', cityName: '東京都品川区', areaName: '南大井6丁目18番地(大森住宅）以外'});
      assert.deepEqual(data.result, ['燃やすごみ', '陶器・ガラス・金属ごみ','資源']);
      done();
    });
  });

  it('should be date and category in month', function(done){
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140601.html');
    scraper.dateAndCategoryInMonth(2014, 6, function(err, data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154', year: 2014, month: 6, cityName: '東京都品川区',areaName: '南大井6丁目18番地(大森住宅）以外'});
      assert.equal(data.result.length, 30);
      assert.deepEqual(data.result[0], {'2014-06-01': null});
      assert.deepEqual(data.result[1], {'2014-06-02': '陶器・ガラス・金属ごみ'});
      assert.deepEqual(data.result[2], {'2014-06-03': '燃やすごみ'});
      assert.deepEqual(data.result[3], {'2014-06-04': null});
      assert.deepEqual(data.result[27], {'2014-06-28': '資源'});
      assert.deepEqual(data.result[28], {'2014-06-29': null});
      assert.deepEqual(data.result[29], {'2014-06-30': null});
      done();
    });
  });

  it('should be what date(null)', function(done){
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140601.html');
    scraper.whatDate('2014-06-01', function(err, data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154', cityName: '東京都品川区',areaName: '南大井6丁目18番地(大森住宅）以外'});
      assert.deepEqual(data.result, {'2014-06-01': null});
      done();
    });
  });

  it('should be what date(gomi)', function(done){
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140601.html');
    scraper.whatDate('2014-06-02', function(err, data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154', cityName: '東京都品川区',areaName: '南大井6丁目18番地(大森住宅）以外'});
      assert.deepEqual(data.result, {'2014-06-02': '陶器・ガラス・金属ごみ'});
      done();
    });
  });
});
