'use strict'
import test from 'ava'
import albumArt from './index'

test( 'returns a url', async t => {

	t.plan( 1 )

	const response = await albumArt( 'cher' )
	t.is( response.indexOf( 'http' ), 0, 'response is a URL' )

} )

test( 'specifying a size returns a different url', async t => {

	t.plan( 1 )

	const response1 = await albumArt( 'cher' )
	const response2 = await albumArt( 'cher', { size: 'small' } )
	t.not( response1, response2, 'small and large size are different URLs' )

} )

test( 'album vs artist art return different urls', async t => {

	t.plan( 1 )

	const response1 = await albumArt( 'cher' )
	const response2 = await albumArt( 'cher', { album: 'i got you babe' } )
	t.not( response1, response2, 'album seach returns different URL' )

} )

test( 'handles invalid query', async t => {

	t.plan( 1 )

	const response = await albumArt( 'notaband' )
	t.is( response instanceof Error, true, 'response is an error' )

} )

test.cb( 'callback returns a url', t => {

	t.plan( 1 )

	albumArt( 'cher', ( err, res ) => {

		err && t.end( err )
		t.is( res.indexOf( 'http' ), 0, 'response is a URL' )
		t.end()

	} )

} )

