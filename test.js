'use strict';
var assert = require('assert');
var albumArt = require('./index');

it('should return an image url', function () {
	albumArt('cher', function (err, url) {
	    assert.strictEqual(url.indexOf('http'), 0);
	});
});
