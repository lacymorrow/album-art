import test from 'ava'
import albumArt from './index.js'

test( 'returns a url', async t => {

	t.plan( 1 )

	const response = await albumArt( 'cher' )
	t.is( response.indexOf( 'http' ), 0, 'response is a URL' )

} )

test( 'specifying a size returns a different url', async t => {

	t.plan( 1 )

	const response1 = await albumArt( 'cher' )
	const response2 = await albumArt( 'cher', {size: 'small'} )
	t.not( response1, response2, 'small and large size are different URLs' )

} )

test( 'album vs artist art return different urls', async t => {

	t.plan( 1 )

	const response1 = await albumArt( 'cher' )
	const response2 = await albumArt( 'cher', {album: 'i got you babe'} )
	t.not( response1, response2, 'album seach returns different URL' )

} )

// Known failure: Spotify fuzzy-matches gibberish and returns a random artist
// instead of erroring, and an empty query is not rejected at all. Tracked
// separately; kept as `failing` so the suite flags it the day it starts passing.
test.failing( 'handles invalid query', async t => {

	t.plan( 1 )

	try {

		console.log( await albumArt( 'asasdgsdgazsdgfzsdf' ) )

	} catch ( e ) {

		t.is( e instanceof Error, true, 'response is an error' )

	}

} )

test.failing( 'handles invalid query #2', async t => {

	t.plan( 1 )

	try {

		console.log( await albumArt( '' ) )

	} catch ( e ) {

		t.is( e instanceof Error, true, 'response is an error' )

	}

} )

test( 'callback returns a url', async t => {

	t.plan( 1 )

	await albumArt( 'cher', ( _err, res ) => {

		t.is( res.indexOf( 'http' ), 0, 'response is a URL' )

	} )

} )

test( 'can handle special characters in album name', async t => {

	t.plan( 1 )

	const response = await albumArt( 'kaytranada', {album: '99.9%'} )
	t.is( response.indexOf( 'http' ), 0, 'response is a URL' )

} )

