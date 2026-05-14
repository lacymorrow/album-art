<div align="center">
  <a href="https://github.com/lacymorrow/album-art">
    <img src=".github/assets/logo-horizontal.svg" alt="album-art" width="320">
  </a>

  <p><strong>Fetch album or artist cover art</strong> ➔ "The Beatles" → http://path/to/beatles.jpg</p>

  <p>
    <a href="https://www.npmjs.com/package/album-art"><img alt="npm version" src="https://img.shields.io/npm/v/album-art?style=flat"></a>
    <a href="https://www.npmjs.com/package/album-art"><img alt="npm downloads" src="https://img.shields.io/npm/dm/album-art?style=flat"></a>
    <a href="https://github.com/lacymorrow/album-art/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/lacymorrow/album-art/ci.yml?style=flat&label=CI"></a>
    <a href="./LICENSE"><img alt="License" src="https://img.shields.io/npm/l/album-art?style=flat"></a>
    <a href="https://npm.runkit.com/album-art"><img alt="Try on RunKit" src="https://img.shields.io/badge/Try-RunKit-f55fa6?style=flat"></a>
  </p>

  <img src="./demo.svg?sanitize=true" alt="album-art demo" width="700">
</div>

---

> [!IMPORTANT]
> This library is **feature-complete** and only receives bug-fix updates. Feature requests still welcome — please open an issue.

> [!NOTE]
> Last.fm [cannabilized their own API](https://getsatisfaction.com/lastfm/topics/api-announcement-dac8oefw5vrxq) and broke many applications, including this one. `album-art` now uses Spotify for image data. The public API is fully backwards-compatible.

## Features

- Use anywhere, browser or Node (UMD bundle — [browser support](https://caniuse.com/#feat=fetch))
- Works in React + Next.js, client and server, via [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)
- Promise **and** callback API
- Fetch images for albums or artists
- Multiple size options (`small` · `medium` · `large`)
- Powered by Spotify's catalog

## Install

```bash
npm install album-art
```

In the browser:

```html
<!-- albumArt as a window global -->
<script src="https://unpkg.com/album-art"></script>
```

Also available via [JSDelivr](https://cdn.jsdelivr.net/npm/album-art/index.min.js).

## Usage

```js
const albumArt = require("album-art");

await albumArt("Rush").then(console.log);
//=> http://path/to/rush.jpg
```

### Callback form

```js
albumArt("Rush", (error, response) => {
  console.log(response);
  //=> http://path/to/rush.jpg
});
```

### With album and size options

```js
await albumArt("Rush", { album: "2112", size: "small" }).then(console.log);
//=> http://path/to/rush_2112_small.jpg
```

> [!TIP]
> Try it live without installing — [open in RunKit](https://runkit.com/lacymorrow/album-art) (here's an [example output](https://runkit.io/lacymorrow/album-art/branches/master?search=Ben+Folds&album=Songs+for+Silverman)).

## API

### `albumArt(artist [, options] [, callback])`

Accepts an artist string to search for. Returns a Promise that resolves to a URL string.

| Argument | Type | Required | Description |
|---|---|:---:|---|
| `artist` | `string` | ✅ | Artist to search for |
| `options.album` | `string` | | Album to search for |
| `options.size` | `"small" \| "medium" \| "large"` | | Requested image size |
| `callback` | `(err, response) => void` | | Optional Node-style callback |

## CLI

Install globally to use from the shell:

```bash
npm install --global album-art

album-art --help
#  Usage
#    $ album-art artist [album] [size]
#
#  Example
#    $ album-art 'The Beatles' --album 'Abbey Road' --size 'large'
#    http://path/to/beatles/abbey_road_large.jpg
```

## Related

Part of a small family of media-data utilities:

- [movie-info](https://github.com/lacymorrow/movie-info) — Get info, images, and ratings about a movie.
- [movie-trailer](https://github.com/lacymorrow/movie-trailer) — Find the trailer for a movie.
- [movie-art](https://github.com/lacymorrow/movie-art) — Get the poster art for a movie.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — image data (subject to the [Spotify API Terms](https://developer.spotify.com/terms/)).
- The original [Last.fm API](https://www.last.fm/api) — RIP, you were the source for the first three major versions of this library.

## License

[MIT](./LICENSE) © [Lacy Morrow](https://lacymorrow.com)

<div align="center">
  <sub>If album-art saved you time, consider <a href="https://github.com/sponsors/lacymorrow">sponsoring on GitHub</a>, <a href="https://patreon.com/lacymorrow">supporting on Patreon</a>, or <a href="https://buymeacoffee.com/lm">buying a coffee</a>.</sub>
</div>
