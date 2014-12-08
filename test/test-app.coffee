###
	generator-html5-app

	test-app.coffee

	@author admin
	
	@note Created on 7/12/2014 by PhpStorm
	@note uses Codoc
	@see https://github.com/coffeedoc/codo
###
"use strict"

path = require("path")
assert = require("yeoman-generator").assert
helpers = require("yeoman-generator").test
os = require("os")

describe "html5-app:app", ->
	before (done) ->
		helpers.run(path.join(__dirname, "../app")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions(
			"skip-install": true
		).withPrompt(
			someOption: true
		).on "end", done

	it "creates project config files", ->
		assert.file [
			"bower.json"
			"package.json"
			".editorconfig"
			".jshintrc"
		]

	it "creates empty asset directories", ->
		emptyFolderList = [
			"img"
			"styles"
			"fonts"
			"scripts"
		]
		assert.file emptyFolderList
	it "creates a valid yeoman config file", ->
		assert.file ".yo-rc.json"
	it "saves the user's answers in the yeoman config file", ->
		assert.fileContent ".yo-rc.json", /"authorName"/