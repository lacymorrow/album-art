export default {
	// Plain npm library: no cargo workspace, and the sibling homebrew-tap is not ours.
	cargoWorkspaces: [],
	git: {
		releaseBranch: "master",
	},
	steps: {
		npm: true,
		githubRelease: true,
		homebrew: false,
		// No tag-triggered workflow in this repo, so there is no CI run to watch.
		watchCi: false,
	},
};
