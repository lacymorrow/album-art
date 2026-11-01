export default {
	// Plain npm library: no cargo workspace, and the sibling homebrew-tap is not ours.
	cargoWorkspaces: [],
	git: {
		releaseBranch: "master",
	},
	steps: {
		// The npm publish is delegated to .github/workflows/release.yml, which
		// authenticates to npm over OIDC (trusted publishing). Publishing from
		// a laptop would need a long-lived npm token, which npm is restricting
		// for direct publishes, and which no agent here has. See LAC-6337.
		npm: false,
		githubRelease: true,
		homebrew: false,
		// shipx only watches CI when `githubRelease` or `homebrew` is delegated;
		// it does not yet treat `npm: false` as delegated, so this flag has no
		// effect here and the tag workflow has to be checked by hand. LAC-6348.
		watchCi: false,
	},
};
