workflow "Test" {
  on = "push"
  resolves = ["use-package-json-metadata-action "]
}

action "use-package-json-metadata-action" {
  uses = "./"
  secrets = ["GH_TOKEN"]
}
