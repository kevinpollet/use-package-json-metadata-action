/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const fs = require("fs");
const { resolve } = require("path");
const Octokit = require("@octokit/rest").plugin(require("@octokit/rest"));

const { GITHUB_REPOSITORY, GITHUB_WORKSPACE, GH_TOKEN } = process.env;
const [owner, repo] = GITHUB_REPOSITORY.split("/");
const packageJSONPath = resolve(GITHUB_WORKSPACE, "package.json");

if (!fs.existsSync(packageJSONPath)) {
  console.error("Unable to resolve package.json file");
  process.exit(1);
}

const { description, homepage, keywords } = require(packageJSONPath);
const octokit = new Octokit({ auth: GH_TOKEN, previews: ["mercy-preview"] });

Promise.all([
  octokit.repos.replaceTopics({ owner, repo, names: keywords || [] }),
  octokit.repos.update({ owner, repo, name: repo, description, homepage })
]).catch(err => {
  console.error(err);
  process.exit(2);
});
