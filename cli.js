#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var albumArt = require('./index');
var artist = process.argv[2];
var album = process.argv[3];

function help() {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ album-art [artist] [album]');
	console.log('');
	console.log('Example');
	console.log('  $ album-art \'The Beatles\'');
	console.log('  http://path/to/beatles.jpg');
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

console.log(AlbumArt(artist, album));
