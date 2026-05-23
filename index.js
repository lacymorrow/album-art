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
		let query
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

		// Use only primary artist for better matching; split on &/;/, strips any & before it reaches the query
		const primaryArtist = artist.split( /[;,&]/ )[0].trim()

		let method = 'artist'
		let fallbackQuery = null

		if ( opts.album !== null ) {

			method = 'album'
			fallbackQuery = `${primaryArtist} ${opts.album}`

			// If artist and album are the same word, don't repeat it
			if ( primaryArtist.toLowerCase() === opts.album.toLowerCase() ) {

				query = `artist:${primaryArtist}`

			} else {

				query = `artist:${primaryArtist} album:${opts.album}`

			}

		} else {

			fallbackQuery = primaryArtist
			query = `artist:${primaryArtist}`

		}

		// Bump limit to 10 so we can find best artist match
		const queryParams = `?q=${encodeURIComponent( query )}&type=${method}&limit=10`

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

		// Helper to extract image url from items based on size.
		// Tries an exact (case-insensitive) name match first; falls back to items[0].
		// Artist search results use item.name; album search results use item.artists[].name.
		const extractImage = ( items ) => {

			let match

			if ( method === 'artist' ) {

				// Artist results: match against item.name directly
				match = items.find( item =>
					item.name.toLowerCase() === primaryArtist.toLowerCase()
				) || items[0]

			} else {

				// Album results: match against the artists array
				match = items.find( item =>
					item.artists.some( a => a.name.toLowerCase() === primaryArtist.toLowerCase() )
				) || items[0]

			}

			const images = ( match && match.images ) || []
			if ( images.length === 0 ) return null

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

			return largest.url

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

						return Promise.reject( new Error( `JSON - ${json.error} ${json.message}` ) )

					}

					if ( !json[method + 's'] || json[method + 's'].items.length === 0 ) {

						// Retry with loose fallback query
						const fallbackParams = `?q=${encodeURIComponent( fallbackQuery )}&type=${method}&limit=10`
						const fallbackUrl = `${apiEndpoint}/search${fallbackParams}`

						return fetch( fallbackUrl, {
							method: 'get',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								Authorization: `Bearer ${authToken}`
							}
						} )
							.then( res => res.json() )
							.then( json => {

								if ( !json[method + 's'] || json[method + 's'].items.length === 0 ) {

									return Promise.reject( new Error( 'No results found' ) )

								}

								return extractImage( json[method + 's'].items )

							} )

					}

					return extractImage( json[method + 's'].items )

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
