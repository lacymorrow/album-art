'use strict';

( ( root, cx ) => {

	if ( typeof define === 'function' && define.amd ) {

		// AMD
		define( ['fetch'], cx )

	} else if ( typeof exports === 'object' ) {

		// Node, CommonJS-like
		module.exports = cx( require( 'node-fetch' ) )

	} else {

		// Browser globals (root is window)
		root.albumArt = cx( root.fetch )

	}

} )( this, fetch => {

	const albumArt = ( artist, options, cb ) => {

		// Massage inputs
		if ( typeof artist !== 'string' ) {

			throw new Error( 'Expected search query to be a string' )

		}

		if ( typeof options === 'function' ) {

			cb = options
			options = null

		}

		if ( typeof cb !== 'function' ) cb = null

		// Default options
		artist = artist.replace( '&', 'and' )
		const opts = Object.assign( {
			album: null,
			size: null
		}, options )

		// Public Key on purpose
		const apiKey = '4cb074e4b8ec4ee9ad3eb37d6f7eb240'
		const sizes = ['small', 'medium', 'large', 'extralarge', 'mega']
		const method = ( opts.album === null ) ? 'artist' : 'album'
		const url = 'https://ws.audioscrobbler.com' +
			encodeURI( '/2.0/?format=json&api_key=' +
				apiKey +
				'&method=' + method +
				'.getinfo&artist=' + artist +
				( opts.album !== null ? '&album=' + opts.album : '' ) )
		const response = fetch( url, {
			method: 'GET'
		} )
			.then(
				res => res.json(),
				err => Promise.reject( err.message )
			)
			.then( json => {

				if ( typeof ( json.error ) !== 'undefined' ) {

					// Error
					return Promise.reject( new Error( `JSON - ${json.error} ${json.message}` ) )

				}

				let output

				if ( json[method] && json[method].image ) {

					// Get largest image, 'mega'
					const i = json[method].image.length - 2
					output = json[method].image[i]['#text']

				} else {

					// No image art found
					return Promise.reject( new Error( 'No results found' ) )

				}

				if ( sizes.indexOf( opts.size ) !== -1 && json[method] && json[method].image ) {

					// Return specific image size
					json[method].image.forEach( ( e, i ) => {

						if ( e.size === opts.size && e['#text'] ) {

							output = e['#text']

						}

					} )

				}

				return output || Promise.reject( new Error( 'No image found' ) )

			} )
			.catch( error => error )

		// Callback
		if ( cb ) {

			return response.then( res => cb( null, res ), err => cb( err, null ) )

		}

		// Promise
		return response

	}

	// exposed public method
	return albumArt

} )
