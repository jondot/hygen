# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- TBD

## [2.0.0] - 2018-11-19

### Changed

- New prompter - [enquirer](https://github.com/enquirer/enquirer) to replace inquirer. This has led to 5x increase in speed, our best performance yet.
    - Expect breaking changes, enquirer is mostly compatible with inquirer but not direct swap if you're using advanced features. To keep compatibility [see this](https://github.com/enquirer/enquirer/issues/40)

