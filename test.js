'use strict';
var assert = require('assert');
var fileUrl = require('./index');

it('should return an image url', function () {
	assert(/file:\/\/\/.*\/test\.jpg/.test(fileUrl('test.jpg')));
	assert.strictEqual(fileUrl('/Users/sindresorhus/dev/te^st.jpg'), 'file:///Users/sindresorhus/dev/te%5Est.jpg');
});
