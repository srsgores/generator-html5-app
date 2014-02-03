/*global describe, beforeEach, it*/
"use strict";

/*
TODO: Scaffold out unit tests folder
TODO: Scaffold out sample unit tests
TODO: Scaffold out sample main.scss
TODO: Scaffold out scripts, whether coffeescript of js
*/

var path = require("path");
var helpers = require("yeoman-generator").test;
var defaultOptions = {
	"appname": this.appName,
	"description": "Sample description",
	"author":  {
		"name": "Sean Goresht",
		"email": "seangores@gmail.com",
		"url": "http://seangoresht.com"
	}
};

describe("html5-app generator", function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator("html5-app:app", [
				"../../app"
			]);
			done();
		}.bind(this));
	});

	it("creates expected files", function (done) {
		var expected = [
			// add files you expect to exist here.
			".jshintrc",
			".editorconfig"
		];

		helpers.mockPrompt(this.app, defaultOptions);
		this.app.options["skip-install"] = true;
		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});
	it("sets the name as default as the folder name", function () {
		// arrange
		var testFileName = "my-directory";
		// act
		// assert
	});
	it("creates empty directories", function () {
		// Arrange
		var emptyFolderList = [
			"img",
			"styles",
			"scripts"
		];
		// Act
		helpers.mockPrompt(this.app, defaultOptions);
		this.app.options["skip-install"] = true;
		// Assert
		this.app.run({}, function () {
			helpers.assertFiles(emptyFolderList);
			done();
		});
	});
});
