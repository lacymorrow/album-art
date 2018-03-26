'use strict';

( function ( root, cx ) {

	if ( typeof define === 'function' && define.amd ) {

		// AMD
		define( [], cx )

	} else if ( typeof exports === 'object' ) {

		// Node, CommonJS-like
		module.exports = cx()

	} else {

		// Browser globals (root is window)
		root.albumArt = cx()

	}

} )( this, function () {

	function isNode() {
		return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
	}

	function albumArt (artist, album, size, cb) {
		if (typeof artist !== 'string') {
			throw new Error('Expected a string');
		}
		if (typeof album === 'function') {
			cb = album;
			album = size = null;
		} else if (typeof size === 'function') {
			cb = size;
			size = null;
		}

		var data = '';
		var sizes = ['small', 'medium', 'large', 'extralarge', 'mega'];
		var method = (album === null) ? 'artist' : 'album';
		var apiKey = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
		var http = require('http');
		var artist = artist.replace ("&", "and");
		var options = {
		  host: 'ws.audioscrobbler.com',
		  port: 80,
		  path: encodeURI('/2.0/?format=json&api_key=' + apiKey + '&method=' + method + '.getinfo&artist=' + artist + '&album=' + album)
		};
		http.get(options, function(resp){
		  resp.on('data', function(chunk){
		  	data += chunk;
		  });
		  resp.on('end', function(){
		    var json = JSON.parse(data);
		    if (typeof(json.error) !== 'undefined'){
		    	// Error
		    	return cb('JSON Error: ' + json.message, '');
		    } else if (sizes.indexOf(size) !== -1 && json[method] && json[method].image){
		    	// Return image in specific size
		    	json[method].image.forEach(function(e, i) {
		    		if (e.size === size){
		    			cb(null, e['#text']);
		    		}
		    	});
		    } else if (json[method] && json[method].image) {
		    	// Return largest image
		    	var i = json[method].image.length - 2;
		    	cb(null, json[method].image[i]['#text']);
		    } else {
		    	// No image art found
		    	cb('Error: No image found.', '');
		    }
		  });
		}).on("error", function(e){
		    return cb('Got error: ' + e.message);
		});

	}

	// exposed public method
	return albumArt

} )
