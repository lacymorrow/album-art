'use strict';

( ( root, cx ) => {

	if ( typeof define === 'function' && define.amd ) {

		// AMD
		define( ['cross-fetch'], cx )

	} else if ( typeof exports === 'object' ) {

		// Node, CommonJS-like
		module.exports = cx( require( 'cross-fetch' ) )

	} else {

		// Browser globals (root is window)
		root.albumArt = cx( root.fetch )

	}

} )( this, fetch => {

	const albumArt = async ( artist, options, cb ) => {

		// Massage inputs
		if ( typeof artist !== 'string' ) {

			throw new TypeError( 'Expected search query to be a string' )

		}

		if ( typeof options === 'function' ) {

			cb = options
			options = null

		}

		if ( typeof cb !== 'function' ) {

			cb = null

		}

		// Default options
		let query = artist.replace( '&', 'and' )
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

		let method = 'artist'
		if ( opts.album !== null ) {

			method = 'album'
			query += ` ${opts.album}` // add space + album name

		}

		// Create a query like "<artist> <album>" and escape it
		const queryParams = `?q=${encodeURIComponent( query )}&type=${method}&limit=1`

		// Create request URL
		const searchUrl = `${apiEndpoint}/search${queryParams}`
		const authString = `${clientId}:${clientSecret}`

		let authorization
		if ( typeof btoa !== 'undefined' ) {

			authorization = btoa( authString )

		} else if ( Buffer ) {

			authorization = Buffer.from( authString ).toString( 'base64' )

		} else {

			throw new Error( 'No suitable environment found' )

		}

		// Start by authorizing a session
		let error = null
		const authToken = await fetch( authEndpoint, {
			method: 'post',
			body: 'grant_type=client_credentials',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${authorization}`
			}
		} )
			.then(
				res => res.json()
			)
			.then(
				json => json.access_token
			)
			.catch(
				err => {

					error = err

				}
			)

		// Perform image search
		const response = !error && await fetch( searchUrl, {
			method: 'get',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${authToken}`
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

					if ( !json[method + 's'] || json[method + 's'].items.length === 0 ) {

						// Error
						return Promise.reject( new Error( 'No results found' ) )

					}

					// Select image size
					const images = json[method + 's'].items[0].images

					let smallest = images[0]
					let largest = images[0]

					for ( const element of images ) {

						if ( parseInt( element.width ) < parseInt( smallest.width ) ) {

							smallest = element

						}

						if ( parseInt( element.width ) > parseInt( largest.width ) ) {

							largest = element

						}

					}

					if ( opts.size === SIZES.SMALL ) {

						return smallest.url

					}

					if ( opts.size === SIZES.MEDIUM && images.length > 1 ) {

						return images[1].url

					}

					// Large by default
					return largest.url

				}
			)
			.catch( err => {

				error = err

			} )

		// Callback
		if ( cb ) {

			return cb( error, response )

		}

		// Non-callback, throw errors
		if ( error ) {

			throw error

		}

		// Promise
		return response

	}

	// Exposed public method
	return albumArt

} )
