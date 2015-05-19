/**
* Docvy's Updater
*
* The MIT License (MIT)
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/


// npm-installed modules
var async = require("async");
var debug = require("debug")("docvy:updater");
var Github = require("github");
var semverDiff = require("semver-diff");
var utils = require("docvy-utils");


// module variables
var github;


debug("configuring utils");
utils = utils.configure(require("./config.json"));


debug("creating new github client");
github = new Github({
  version: "3.0.0",
  debug: !!(process.env.DEBUG)
});


exports.check = checkForUpdates;
function checkForUpdates(callback) {
  var latestReleaseId = 1;
  var owner = utils.getConfig("repo.owner");
  var repo = utils.getConfig("repo.name");

  debug("checking updates from %s/%s", owner, repo);
  async.series([
    getLatestRelease,
    getPreviousRelease
  ], end);

  // getting the latest release
  function getLatestRelease(done) {
    debug("getting latest release");
    github.releases.getRelease({
      owner: owner,
      repo: repo,
      id: "latest"
    }, function(err, result) {
      if ( !(err) && result) {
        latestReleaseId = result.id - 1;
        debug(latestReleaseId);
      }
      return done(err, result);
    });
  }

  // getting the previous release
  function getPreviousRelease(done) {
    debug("getting previous release");
    github.releases.getRelease({
      owner: owner,
      repo: repo,
      id: latestReleaseId - 1
    }, done);
  }

  // the end
  function end(err, resultSet) {
    debug("finalizing: %j", err);
    if (err) {
      return callback(err);
    }
    var latest = resultSet[0];
    var previous = resultSet[1];
    var diff = semverDiff(latest.tag_name, previous.tag_name);
    var info = {
      version: latest.tag_name,
      changes: {
        major: diff === "major",
        minor: diff === "minor",
        bug: diff === "patch"
      },
      news: latest.body
    };
    return callback(null, info);
  }
}

