'use strict';
var assert = require('assert');
var albumArt = require('./index');

it('should return an image url', function () {
	assert.strictEqual(albumArt('cher').indexOf('http'),0);
});
