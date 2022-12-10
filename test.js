'use strict'
const test = require( 'ava' )
const albumArt = require( './index' )

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

test( 'handles invalid query', async t => {

	t.plan( 1 )

	try {

		console.log( await albumArt( 'asasdgsdgazsdgfzsdf' ) )

	} catch ( e ) {

		t.is( e instanceof Error, true, 'response is an error' )

	}

} )

test( 'handles invalid query #2', async t => {

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

