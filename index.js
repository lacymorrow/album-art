'use strict';
var path = require('path');

module.exports = function (artist, album, size, cb) {
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

	var sizes = ['small', 'medium', 'large', 'extralarge', 'mega'];
	var method = (album === null) ? 'artist' : 'album';
	var apiKey = '4cb074e4b8ec4ee9ad3eb37d6f7eb240';
	var http = require('http');
	var options = {
	  host: 'ws.audioscrobbler.com',
	  port: 80,
	  path: encodeURI('/2.0/?format=json&api_key=' + apiKey + '&method=' + method + '.getinfo&artist=' + artist + '&album=' + album)
	};

	var data = '';
	http.get(options, function(resp){
	  resp.on('data', function(chunk){
	  	data += chunk;
	  });
	  resp.on('end', function(){
	    var json = JSON.parse(data);
	    if (typeof(json.error) !== 'undefined'){
	    	return cb('Got error: ' + json.message);
	    } else {
		    if (sizes.indexOf(size) !== -1){
		    	json[method].image.forEach(function(i) {
		    		if (i.size === size){
		    			cb(null, i['#text']);
		    		}
		    	});
		    } else {
		    	// Return largest image
		    	var i = json[method].image.length - 1;
		    	cb(null, json[method].image[i]['#text']);
		    }
	    }
	  });
	}).on("error", function(e){
	    return cb('Got error: ' + json.message);
	});
};
