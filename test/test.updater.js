/**
* Testing the updater
*
* The MIT License (MIT)
* Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
*/


// npm-installed modules
var should = require("should");


// own modules
var updater = require("../lib/updater");


describe("updater.check", function() {
  it("returns an object with all the documented props", function() {
    updater.check(function(err, info) {
      should(err).not.be.ok;
      should(info.version).be.a.String;
      should(info.changes).be.an.Object;
      should(info.changes.major).be.a.Boolean;
      should(info.changes.minor).be.a.Boolean;
      should(info.changes.bug).be.a.Boolean;
      should(info.news).be.a.String;
    });
  });
});

