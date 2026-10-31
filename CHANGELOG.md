# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Centered README hero, logo (music-note on amber rounded square), 5 modern badges (npm version, downloads, CI, license, RunKit).
- `.github/` community files: FUNDING, dependabot, ISSUE_TEMPLATE, PR template, SECURITY, CONTRIBUTING.
- CI workflow (smoke test on Node 20/22/24/26 + macOS).
- Branded 1280×640 social preview banner.
- CodeQL security scanning + Dependabot auto-merge workflow.
- Smoke tests that run the CLI binary in a real child process (`cli.test.mjs`),
  covering `--help`, `--version`, no-argument help, and flag parsing.

### Fixed

- The CLI crashed on startup with `TypeError: meow is not a function`
  ([#74](https://github.com/lacymorrow/album-art/issues/74)). meow v14 is ESM-only,
  so `require( 'meow' )` handed back the module namespace instead of the function.
  The bin is now ESM (`cli.mjs`).
- `--album` / `-a` and `--size` / `-s` were accepted and then ignored. The code read
  `cli.flags.a`, which meow stopped populating when `alias` was renamed `shortFlag`.
- CLI failures (no results, network trouble) dumped a raw unhandled-rejection stack
  trace at the user. They now print just the error message and exit 1.
- `npm test` could not run at all: ava v8 is ESM-only, so `require( 'ava' )` failed
  the same way meow did. Test files are now ESM.
- Broken README demo link (was `?sanitize=truedemo.svg`).
- README inaccuracies: `cross-fetch` (not `isomorphic-fetch`), simplified Promise examples.

### Changed

- `engines.node` is now `>=20`, which is what meow v14 actually requires. It claimed
  `>=0.10.0`, so npm happily installed a combination that could not run.
- CI runs the CLI binary instead of only checking that the file exists. The old check
  passed while the CLI was crashing for every user.

## [4.0.0] and earlier

For pre-4.0 history, see [`git log`](https://github.com/lacymorrow/album-art/commits/master)
and the [GitHub Releases page](https://github.com/lacymorrow/album-art/releases).

[Unreleased]: https://github.com/lacymorrow/album-art/compare/v4.0.0...HEAD
