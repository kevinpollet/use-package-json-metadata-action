/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const Octokit = require('@octokit/rest');
const path = require("path");

const packageJSONPath = path.resolve(process.env.GITHUB_WORKSPACE, "package.json");
const packageJSON = require(packageJSONPath);
if (!packageJSON) {
  process.stderr.write("Unable to resolve package.json file");
  process.exit(1);
}

const { description, homepage } = packageJSON;
const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split("/");
const octokit = new Octokit({ 
  auth: process.env.GH_TOKEN, 
  previews: [ "mercy-preview" ] 
});

octokit.repos
  .replaceTopics({ owner, repo, names: packageJSON.keywords })
  .then(() => octokit.repos.update({ owner, repo, name: repo, description, homepage, }))
  .then(() => process.stdout.write("SUCCESS"))
  .catch(err => {
    process.stderr.write(err.message);
    process.exit(1); 
  });
