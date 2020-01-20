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

	const albumArt = async ( artist, options, cb ) => {

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

		// Image size options
		const SIZES = {
			SMALL: 'small',
			MEDIUM: 'medium',
			LARGE: 'large'
		}

		// Public Key on purpose - don't make me regret this
		const apiEndpoint = 'https://api.spotify.com/v1'
		const authEndpoint = 'https://accounts.spotify.com/api/token'
		const clientId = '3f974573800a4ff5b325de9795b8e603'
		const clientSecret = 'ff188d2860ff44baa57acc79c121a3b9'

		// Create request URL
		const method = ( opts.album === null ) ? 'artist' : 'album'
		const queryParams = `?q=${encodeURIComponent( artist )}${method === 'album' ? '%20' + opts.album : ''}&type=${method}&limit=1`
		const searchUrl = `${apiEndpoint}/search${queryParams}`

		// Start by authorizing a session
		const authToken = await fetch( authEndpoint, {
			method: 'post',
			body: 'grant_type=client_credentials',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + Buffer.from( `${clientId}:${clientSecret}` ).toString( 'base64' )
			}
		} )
			.then(
				res => res.json()
			)
			.then(
				json => json.access_token
			)

		// Perform image search
		const response = await fetch( searchUrl, {
			method: 'get',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Bearer ${authToken}`
			}
		} )
			.then(
				res => res.json()
			)
			.then(
				json => {

					if ( typeof ( json.error ) !== 'undefined' ) {

						// Error
						return Promise.reject( new Error( `JSON - ${json.error} ${json.message}` ) )

					}

					if ( !json[method + 's'] ) {

						// Error
						return Promise.reject( new Error( 'No results found' ) )

					}

					console.log(json[method + 's'].items[0].images[0].url)

					// Select image size
					const images = json[method + 's'].items[0].images

					if ( opts.size === SIZES.SMALL ) {

						return images[0].url

					} else if ( opts.size === SIZES.MEDIUM && images.length > 1 ) {

						return images[1].url

					} else {

						// Large by default
						return images[images.length - 1].url

					}

				}
			)
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
