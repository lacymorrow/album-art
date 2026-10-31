#!/usr/bin/env node
import meow from 'meow'
import albumArt from './index.js'

const cli = meow( `
	Usage
	  $ album-art artist [album] [size]

	Options
		--album,  -a  Optionally search for a specific album art
		--size,   -s  Possible values: [small|medium|large]

	Example
	  $ album-art 'The Beatles' --album 'Abbey Road' --size 'large'
	  // => http://path/to/beatles/album.jpg
`, {
	importMeta: import.meta,
	flags: {
		album: {
			type: 'string',
			shortFlag: 'a'
		},
		size: {
			type: 'string',
			shortFlag: 's'
		}
	}
} )

if ( !cli.input[0] ) {

	cli.showHelp()

}

const opts = {
	album: cli.flags.album || null,
	size: cli.flags.size || null
}

// A positional album wins over the flag: `album-art 'The Beatles' 'Abbey Road'`
if ( cli.input[1] ) {

	opts.album = cli.input[1]

}

try {

	console.log( await albumArt( cli.input[0], opts ) )

} catch ( error ) {

	console.error( error.message )
	process.exit( 1 )

}
