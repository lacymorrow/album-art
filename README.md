# album-art 
[![npm version](https://badge.fury.io/js/album-art.svg)](https://badge.fury.io/js/album-art) [![Build Status](https://travis-ci.org/lacymorrow/album-art.svg?branch=master)](https://travis-ci.org/lacymorrow/album-art) [![Dependency Status](https://dependencyci.com/github/lacymorrow/album-art/badge)](https://dependencyci.com/github/lacymorrow/album-art) [![Maintainability](https://api.codeclimate.com/v1/badges/c3e8871f2b6009bd97e2/maintainability)](https://codeclimate.com/github/lacymorrow/album-art/maintainability) [![Try movie-art on RunKit](https://badge.runkitcdn.com/album-art.svg)](https://npm.runkit.com/album-art)

> Fetch an album or artist image url: "The Beatles" ➔ http://path/to/beatles.jpg

[![album-art](https://github.com/lacymorrow/album-art/raw/master/demo.svg?sanitize=truedemo.svg)]()

#### [Try it on RunKit](https://runkit.com/lacymorrow/album-art) _([Output](https://runkit.io/lacymorrow/album-art/branches/master?search=Ben+Folds&album=Songs+for+Silverman))_


## Features
 * Use anywhere, browser or Node - UMD _([Browser Support](https://caniuse.com/#feat=fetch))_
 * Promise and Callback API
 * Fetch images for albums or artists
 * Multiple size options
 * Uses Last.FM data


## Install

Using [NPM](https://npmjs.com):

```bash
$ npm install -g album-art
```

In the browser:

```html
<!-- albumArt window global -->
<script type="text/javascript" src="https://unpkg.com/album-art"></script>
```
(via Unpkg, or via [JSDelivr](https://cdn.jsdelivr.net/npm/album-art/index.min.js))



## Usage
```js
const albumArt = require( 'album-art' )

albumArt( 'Rush' ).then( console.log )
//=> http://path/to/rush.jpg
```

##### Callback
```js
albumArt( 'Rush', ( error, response ) => {
   console.log( response )

   //=> http://path/to/rush.jpg
})
```

##### Usage with album and size options
```js
albumArt( 'Rush', {album: '2112', size: 'small'} )
  .then( console.log )

//=> http://path/to/rush_2112_small.jpg
```


## API

### albumArt(artist [, options] [, callback])

Accepts an artist string to search for.
Returns a Promise which resolves to a string URL.

#### artist

*Required*  
Type: `string`

Artist to search for.

#### callback(error, response)

Function to be called on complete or on error.


### Options

A JavaScript object with the following properties:

#### album

Type: `string`

Album to search for.

#### size

Type: `string` 

Requested image size. 
*possible values:* `small`, `medium`, `large`, `extralarge`, `mega`


## CLI Usage

You can also run as a CLI app by installing it globally:

```bash
$ npm install --global album-art

$ album-art --help

Usage
  $ album-art artist [album] [size]

Example
  $ album-art 'The Beatles' --album 'Abbey Road' --size 'large'
  http://path/to/beatles/abbey_road_large.jpg
```


## Related

* [movie-art](https://github.com/lacymorrow/movie-art)
* [movie-info](https://github.com/lacymorrow/movie-info)
* [movie-trailer](https://github.com/lacymorrow/movie-trailer)


## License

This package uses the Last.fm API for it's data. You may consult the [Last.fm API Terms of Service](http://www.last.fm/api/tos) for license details. 

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
