# use-package-json-metadata-action

Use `package.json` metadata as GitHub repository description, homepage and tags.

## Usage

1. Generate a GitHub token with the `repos` scope (https://github.com/settings/tokens)
2. Add the generated GitHub token as a secret to your repository with the name `GH_TOKEN` (Go to the repo **Settings > Secrets**)
3. Add the following configuration to your workflow file:

```json
workflow "Use package.json metadata as GitHub repository metadata" {
  on = "push"
  resolves = "use-package-json-metadata-action"
}

action "use-package-json-metadata-action" {
  uses = "kevinpollet/use-package-json-metadata-action@{ref}" // where ref is a specific branch, ref, or SHA
  secrets = ["GH_TOKEN"]
}
```

## License

[MIT](./LICENSE.md)
