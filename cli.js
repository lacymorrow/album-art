#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var albumArt = require('./index');
var artist = process.argv[2];
var sizes = ['small', 'medium', 'large', 'extralarge', 'mega'];

function help() {
	console.log(pkg.description);
	console.log('\nUsage');
	console.log('  $ album-art artist [album] [small|medium|large|extralarge|mega]\n');
	console.log('Example');
	console.log('  $ album-art \'The Beatles\' \'White Album\'');
	console.log('  http://path/to/beatles/album.jpg');
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

var cb = function (err, url) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(url);
}

var argc = process.argv.length;
if (argc < 3){ 
	// Not enough args
	help();
} else if (argc === 3){ 
	// Search atist
	albumArt(artist, null, null, cb);
} else if (argc === 4 && sizes.indexOf(process.argv[3]) === -1){ 
	// Search artist and album
	albumArt(artist, process.argv[3], null, cb);
} else if (argc === 4 && sizes.indexOf(process.argv[3]) !== -1){ 
	// Search artist and size
	albumArt(artist, null, process.argv[3], cb);
} else if (sizes.indexOf(process.argv[4]) !== -1){ 
	// Search artist, album and size
	albumArt(artist, process.argv[3], process.argv[4], cb);
} else { 
	// Search artist and album
	albumArt(artist, process.argv[3], null, cb);
}