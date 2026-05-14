# Security Policy

## Reporting a vulnerability

`album-art` is a small library and the attack surface is limited (it makes HTTPS requests to Spotify on your behalf). Still — if you've found something, please report it privately:

➔ https://github.com/lacymorrow/album-art/security/advisories/new

Or email **lacy@lacymorrow.com** with `[album-art security]` in the subject.

Expect an acknowledgement within 72 hours.

## Supported versions

Only the latest published version on npm receives security updates.

## Scope

In scope:
- The published `album-art` npm package
- Network handling, response parsing, callback contract

Out of scope:
- Vulnerabilities in Spotify's API (please report to Spotify)
- Issues in transitive dependencies (report upstream)
