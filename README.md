# album-art [![npm version](https://badge.fury.io/js/album-art.svg)](https://badge.fury.io/js/album-art) [![Build Status](https://travis-ci.org/lacymorrow/album-art.svg?branch=master)](https://travis-ci.org/lacymorrow/album-art) [![Maintainability](https://api.codeclimate.com/v1/badges/c3e8871f2b6009bd97e2/maintainability)](https://codeclimate.com/github/lacymorrow/album-art/maintainability)

> Get an album or artist image url in node: "The Beatles" ➔ http://path/to/beatles.jpg


## Install

```bash
$ npm install --save album-art
```


## Usage

```js

var albumArt = require('album-art');

albumArt('The Beatles', function (err, url) {
    console.log(url);
    //=> http://path/to/beatles.jpg
});

albumArt('The Beatles', 'Abbey Road', 'large', function (err, url) {
    console.log(url);
    //=> http://path/to/beatles/abbey_road_large.jpg
});
```

## API

### albumArt(artist [, album] [, size ] , callback)

#### artist

*Required*  
Type: `string`

Artist to search for.

#### album

Type: `string`

Album to search for.

#### size

Type: `string` 

*possible values:* `small`, `medium`, `large`, `extralarge`, `mega`

Size of image to return.

#### callback(err, url)
*Required*


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global album-art
```

#### Usage

```bash
$ album-art --help

Usage
  $ album-art artist [album] [small|medium|large|extralarge|mega]

Example
  $ album-art 'The Beatles' 'Abbey Road' large
  http://path/to/beatles/abbey_road_large.jpg
```


## Related

* [movie-art](https://github.com/lacymorrow/movie-art)
* [movie-info](https://github.com/lacymorrow/movie-info)
* [movie-trailer](https://github.com/lacymorrow/movie-trailer)


## License

This package uses the Last.fm API for it's data. You may consult the [Last.fm API Terms of Service](http://www.last.fm/api/tos) for license details. 

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
