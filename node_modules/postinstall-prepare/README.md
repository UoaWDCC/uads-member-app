postinstall-prepare
===================

Run your app's `prepare` npm script during this package's `postinstall` script.

## Why

Yarn runs the `prepare` script after `yarn`, `yarn install` and `yarn add <package>` but not after `yarn remove <package>`. If you add this package to your project, it will execute your project's `prepare` hook even after a `yarn remove <package>`. This requires your `prepare` script to be idempotent, becase it will be run twice for `yarn`, `yarn install`, and `yarn add <package>`
