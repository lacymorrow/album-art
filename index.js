'use strict';
var path = require('path');

module.exports = function (artist, album, size) {
	if (typeof artist !== 'string') {
		throw new Error('Expected a string');
	}

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
	  //console.log("statusCode: ", resp.statusCode);
	  //console.log("headers: ", resp.headers);
	  resp.on('data', function(chunk){
	  	data += chunk;
	  });
	  resp.on('end', function(){
	    var json = JSON.parse(data);
	    if (typeof(json.error) !== 'undefined'){
	    	console.log('Got error: ' + json.message);
	    } else {
		    if (size !== null){
		    	json[method].image.forEach(function(i) {
		    		if (i.size === size){
		    			console.log(i['#text']);
		    		}
		    	});
		    } else {
		    	// Return largest image
		    	var i = json[method].image.length - 1;
		    	console.log(json[method].image[i]['#text']);
		    }
	    }
	    //return false;
	  });
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	  //return false;
	});
	return '';
};
