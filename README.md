# 53cal-jp-scraper
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

Scrape the days of 53cal.jp


## Install

```bash
$ npm install --save 53cal-jp-scraper
```


## Usage

```javascript
var GomiCalJp = require('../');
var scraper = GomiCalJp({city: '1130104', area: '1130104154'});

scraper.whatDate('2014-06-04', function(err, data){
  data = {
    meta: {
      city: '1130104',
      area: '1130104154',
      cityName: '東京都品川区',
      areaName: '南大井6丁目18番地(大森住宅）以外',
      link: 'http://www.53cal.jp/areacalendar/?city=1130104&area=1130104154&yy=2014&mm=6'
    },
    result: {
      '2014-06-04': '燃やすゴミ'
    }
  };
});
```

## API

categories

dateAndCategoryInMonth

whatDate


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## Release History

_(Nothing yet)_


## License

Copyright (c) 2014 sanemat. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/53cal-jp-scraper
[npm-image]: https://badge.fury.io/js/53cal-jp-scraper.svg
[travis-url]: https://travis-ci.org/sanemat/node-53cal-jp-scraper
[travis-image]: https://travis-ci.org/sanemat/node-53cal-jp-scraper.svg?branch=master
[daviddm-url]: https://david-dm.org/sanemat/node-53cal-jp-scraper.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/sanemat/node-53cal-jp-scraper
[coveralls-url]: https://coveralls.io/r/sanemat/node-53cal-jp-scraper
[coveralls-image]: https://coveralls.io/repos/sanemat/node-53cal-jp-scraper/badge.png
