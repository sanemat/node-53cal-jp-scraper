'use strict';

var GomiCalJp = require('../lib/53cal-jp-scraper.js');
var assert = require('power-assert');
var nock = require('nock');

describe('gomiCalJpScraper', function () {
  it('should be categories', function(done){
    var scraper = GomiCalJp({ city: '1130104', area: '1130104154' });
    nock('http://www.53cal.jp')
      .get('/areacalendar/?city=1130104&area=1130104154')
      .replyWithFile(200, __dirname + '/53caljp-minamioi-20140531.html');
    scraper.categories(function(data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154'});
      assert.deepEqual(data.result, ['燃やすごみ', '陶器・ガラス・金属ごみ','資源']);
      done();
    });
  });

});
