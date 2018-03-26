#!/usr/bin/env node
'use strict'
const meow = require( 'meow' )
const albumArt = require( './index' )

const cli = meow( `
	Usage
	  $ album-art artist [album] [size]

	Options
		--album,  -a  Optionally search for a specific album art
		--size,   -s  Possible values: [small|medium|large|extralarge|mega]

	Example
	  $ album-art 'The Beatles' --album 'Abbey Road' --size 'large'
	  // => http://path/to/beatles/album.jpg
`, {
		flags: {
			album: {
				type: 'string',
				alias: 'a'
			},
			size: {
				type: 'string',
				alias: 's'
			}
		}
	} )

let opts = {
	album: null,
	size: null
}

if ( cli.flags.a ) opts.album = cli.flags.a
if ( cli.flags.s ) opts.size = cli.flags.s
if ( cli.input[1] ) opts.album = cli.input[1]
if ( !cli.input[0] ) cli.showHelp()

// Search artist, album and size
albumArt( cli.input[0], opts ).then( console.log )
