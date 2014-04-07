# album-art [![Build Status](https://travis-ci.org/sindresorhus/file-url.svg?branch=master)](https://travis-ci.org/sindresorhus/file-url)

> Get an album or artist image url in node: "The Beatles" ➔ http://path/to/beatles.jpg


## Install

```bash
$ npm install --save album-art
```


## Usage

```js
var albumArt = require('album-art');

albumArt('the beatles');
//=> http://path/to/beatles.jpg

albumArt('the beatles', 'abbey road');
//=> http://path/to/beatles/abbey_road.jpg
```


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global album-art
```

#### Usage

```bash
$ album-art --help

Usage
  $ album-art [artist] [album]

Example
  $ album-art 'the beatles'
  http://path/to/beatles.jpg
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
