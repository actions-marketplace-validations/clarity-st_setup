# Clarity setup

A Github Action that sets up the Clarity CLI

## Usage

Add a step to setup the Clarity CLI

```yaml
name: CI
on:
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: clarity-st/setup@v1

```

## Inputs

| Name       | Default  | Requirement | Description                                                                         |
| ---------- | ---------|------------ | ------------------------------------------------------------------------------------|
| `version`  | `v0.0`   | _optional_  | The Clarity CLI version, see https://docs.clarity.st/cli/overview.html#installation |
