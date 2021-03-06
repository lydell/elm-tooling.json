### Version 1.3.0 (2021-02-28)

- Added: elm-test-rs 1.0.0.

### Version 1.2.1 (2021-02-27)

- Fixed: `elm-tooling install` now works in Git Bash on Windows. Travis CI uses Git Bash by default in their Windows environment.

### Version 1.2.0 (2021-02-09)

- Added: elm-format 0.8.5.

### Version 1.1.0 (2021-01-23)

- Added: elm-json 0.2.10.

### Version 1.0.3 (2021-01-23)

- Improved: `elm-tooling` now prints progress more efficiently, resulting in better performance and nicer logs in CI.

### Version 1.0.2 (2021-01-18)

- Fixed: `elm-tooling install` no longer finds `node_modules/` up the directory tree. Links to tools are now _always_ created in `node_modules/.bin/` in the same directory as `elm-tooling.json`. `elm-tooling.json` only affects the current project, so `elm-tooling install` shouldn’t touch stuff outside the project. [#23](https://github.com/elm-tooling/elm-tooling-cli/pull/23)
- Removed: `elm-tooling validate` no longer checks for an `elm.json` next to `elm-tooling.json`, since there are legitimate use cases for only having an `elm-tooling.json`. [#24](https://github.com/elm-tooling/elm-tooling-cli/pull/24)

### Version 1.0.1 (2021-01-10)

- Improved: `--help` now shows the help text even if there are other arguments passed.
- Improved: Each option of `elmToolingCli` is now optional and has its own default. Previously, you had to pass either no options or _all_ options.

### Version 1.0.0 (2021-01-09)

- Improved: `elm-tooling init` now looks at `elm.json` to figure out which Elm version to use.

### Version 0.6.3 (2020-12-19)

- Added: Node.js 10 support. This is useful for npm packages that need to run tests on Node.js 10 and use `elm-tooling` to install `elm` and `elm-format`.
- Updated: Links to documentation and to the specification, since the repo was reorganized a bit.

### Version 0.6.2 (2020-11-17)

- Fixed: `"elm": "0.19.0"` accidentally resulted in Elm 0.19.<strong>1</strong> being downloaded on Windows.

### Version 0.6.1 (2020-10-22)

- Fixed: `getExecutable` now properly deals with prereleases. Previously, `^1.0.0` would match `1.1.0-beta.1`. Prereleases should only be matched if the range contains a prerelease and they both have the same three-digit base.

### Version 0.6.0 (2020-10-17)

- Improved: `elm-tooling install` now removes old links created by earlier runs of `elm-tooling install`.
- Fixed: A broken link in the npm package readme.

### Version 0.5.0 (2020-10-13)

- Added: `elm-tooling tools`. Interactively add, remove and update tools.
- Removed: The hidden `elm-tooling download` command is now removed for real.
- Improved: `elm-tooling install` now has nicer output.
- Improved: The output from most commands now suggest what command to run next.
- Improved: `elm-tooling init` now tries to find what tools you had installed locally using `npm` before and uses those version in the `"tools"` field.
- Improved: `elm-tooling validate` now checks that entrypoints end with `.elm`.

### Version 0.4.1 (2020-10-02)

- Updated: Some links point to the `main` branch instead of `master`.

### Version 0.4.0 (2020-09-30)

- Renamed: `elm-tooling postinstall` is now called `elm-tooling install`.
- Removed: `elm-tooling download`. There’s no use case for it yet. Use `elm-tooling install` instead. (Technically the command is still there but it’s not part of the public API and might be removed for real at any time.)
- Added: Support for `elm-json` (latest version as of this writing).
- Added: `getExecutable` for npm packages that want to depend on `elm-json` (or other tools).
- Improved: `elm-tooling validate` now checks that `/` is used rather than `\` in entrypoints.
- Improved: `elm-tooling help` now shows the version of `elm-tooling`.

### Version 0.3.0 (2020-09-24)

- Added: elm-format 0.8.4.

### Version 0.2.0 (2020-09-22)

- Improved: Show known fields/tools/versions in validation errors.
- Added: It’s now possible to import the CLI and run it from JavaScript without `child_process.spawn`.
- Fixed: Minor bugs.

### Version 0.1.6 (2020-09-08)

- Fixed: The CLI now works on Windows.
- Improved: Lots of little things.

### Version 0.1.5 (2020-09-06)

- Added: Allow turning `elm-tooling postinstall` into a no-op by setting the `NO_ELM_TOOLING_POSTINSTALL` environment variable.
- Improved: The tool now chooses between stdout and stderr more wisely, allowing you to pipe stdout to `/dev/null` for silent operation while still seeing unexpected errors on stderr.
- Improved: Cleanup when download fails.

### Version 0.1.4 (2020-09-06)

- Fixed: Extracting tar archives now works with GNU tar.
- Fixed: Progress is now correctly calculated in locales using `,` as decimal separator.

### Version 0.1.3 (2020-09-06)

- Improved: `elm-tooling postinstall` now overwrites links like `npm` does.

### Version 0.1.2 (2020-09-06)

- Fixed: Node.js 12 support.

### Version 0.1.1 (2020-09-05)

- Fixed: Add shebang to CLI entrypoint.

### Version 0.1.0 (2020-09-05)

- Initial release.
