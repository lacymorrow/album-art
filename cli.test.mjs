import {execFile} from 'node:child_process'
import {createRequire} from 'node:module'
import path from 'node:path'
import process from 'node:process'
import {fileURLToPath} from 'node:url'
import test from 'ava'

const require = createRequire( import.meta.url )
const pkg = require( './package.json' )

const CLI = path.join( path.dirname( fileURLToPath( import.meta.url ) ), pkg.bin['album-art'] )

// Run the published bin the way a user would, in a real child process.
const run = ( args, options = {} ) => new Promise( resolve => {

	execFile( process.execPath, [CLI, ...args], options, ( error, stdout, stderr ) => {

		resolve( {
			code: error === null ? 0 : error.code,
			stdout,
			stderr
		} )

	} )

} )

test( 'cli loads and prints help', async t => {

	const {code, stdout, stderr} = await run( ['--help'] )

	t.is( code, 0, stderr )
	t.regex( stdout, /Usage/, 'help output contains usage' )
	t.regex( stdout, /album-art artist/, 'help output contains the invocation' )

} )

test( 'cli prints its version', async t => {

	const {code, stdout, stderr} = await run( ['--version'] )

	t.is( code, 0, stderr )
	t.is( stdout.trim(), pkg.version, 'reports the package version' )

} )

test( 'cli shows help instead of crashing when no artist is given', async t => {

	const {stdout, stderr} = await run( [] )

	t.notRegex( stdout + stderr, /TypeError/, 'does not throw a TypeError' )
	t.regex( stdout + stderr, /Usage/, 'falls back to the help output' )

} )

test( 'cli reads both short and long flags', async t => {

	const {code, stdout, stderr} = await run( ['cher', '-a', 'believe', '--size', 'small'], {timeout: 60000} )

	t.is( code, 0, stderr )
	t.is( stdout.trim().indexOf( 'http' ), 0, `expected a url, got: ${stdout}${stderr}` )

} )
