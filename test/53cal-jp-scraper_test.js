'use strict';

var GomiCalJp = require('../lib/53cal-jp-scraper.js');
var assert = require('power-assert');

describe('gomiCalJpScraper', function () {
  it('should be categories', function(done){
    var scraper = GomiCalJp({ city: '1130104', area: '1130104154' });
    scraper.categories(function(data){
      assert.deepEqual(data.meta, {city: '1130104', area: '1130104154'});
      done();
    });
  });

});
