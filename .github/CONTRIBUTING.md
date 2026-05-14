# Contributing to album-art

Thanks for considering a contribution! `album-art` is small, stable, and gets the occasional bug-fix release.

## Setup

```bash
git clone https://github.com/lacymorrow/album-art.git
cd album-art
npm install
```

## Test

```bash
npm test            # ava
```

## Conventions

- The library is **feature-complete** — bug fixes and small ergonomics are the bar for PRs. Provider changes / major API changes will likely be deferred.
- [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).
- Keep PRs focused; one logical change per PR.

## Releasing

Releases use [np](https://github.com/sindresorhus/np):

```bash
npm run release
```

## Code of conduct

Be kind. Egregious behavior gets you removed.
