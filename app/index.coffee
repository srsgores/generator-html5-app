###
	generator-html5-app

	index.coffee

	@author Sean Goresht
	
	@note Created on 5/12/2014 by PhpStorm
	@note uses Codoc
	@see https://github.com/coffeedoc/codo
###
"use strict"
yeoman = require "yeoman-generator"
chalk = require "chalk"
yosay = require "yosay"
path = require "path"

module.exports = class Html5AppGenerator extends yeoman.generators.Base
	initializing: ->
		@argument "name",
			type: String
			required: false

		@appname = @name or path.basename(process.cwd())
		@appname = @_.camelize(@_.slugify(@_.humanize(@appname)))
		@appPath = @env.options.appPath
		@pkg = require("../package.json")
	prompting: ->
		done = @async()
		console.log(yosay(
			"Welcome to the #{chalk.red("HTML5 App")} generator"
		))
		prompts = [
			{
				name: "appname"
				message: "What's the name of your app?"
				default: @appname
			}
			{
				type: "list"
				name: "script"
				default: 1
				message: "What would you like to write scripts with?"
				choices: [
					"JavaScript"
					"CoffeeScript"
				]
				filter: (val) ->
					filterMap =
						JavaScript: "js"
						CoffeeScript: "coffee"

					filterMap[val]
			}
			{
				type: "list"
				name: "markup"
				message: "What would you like to write markup with?"
				default: 1
				choices: [
					"HTML"
					"Jade"
				]
				filter: (val) ->
					val.toLowerCase()
			}
			{
				type: "list"
				name: "build"
				message: "Which build tool do you want to use?"
				default: 1
				choices: [
					"Gulp"
					"Grunt"
				]
				filter: (val) ->
					val.toLowerCase()
			}
			{
				type: "list"
				name: "testFramework"
				default: 1
				message: "Which testing framework do you want to use?"
				choices: [
					"Mocha"
					"Jasmine"
					"QUnit"
				]
				filter: (val) ->
					val.toLowerCase()
			}
			{
				type: "list"
				name: "stylesheet"
				default: 3
				message: "What would you like to write stylesheets with?"
				choices: [
					"CSS"
					"Sass"
					"Stylus"
				]
				filter: (val) ->
					val.toLowerCase()
			}
			{
				type: "confirm"
				name: "includejQuery"
				default: true
				message: "Use jQuery?"
			}
			{
				name: "description"
				message: "Describe your app"
				default: "A sample description"
			}
			{
				name: "authorName"
				message: "What's your name?"
				default: "Author name"
			}
			{
				name: "authorEmail"
				message: "What's your e-mail?"
				default: "email@somedomain.com"
			}
			{
				name: "authorURL"
				message: "What's your website?"
				default: "somedomain.com"
			}
			{
				name: "license"
				message: "What's the copyright license?"
				default: "MIT"
			}
		]
		@prompt prompts, ((answers) ->
			@description = answers.description
			@appname = answers.appname
			# choices
			@script = answers.script
			@coffee = (answers.script is "coffee")
			@stylesheet = answers.stylesheet
			@markup = answers.markup
			@testFramework = answers.testFramework

			@authorName = answers.authorName
			@authorEmail = answers.authorEmail
			@authorURL = answers.authorURL
			@build = answers.build
			@grunt = (answers.build is "grunt")
			@gulp = (answers.build is "gulp")
			@license = answers.license
			@includeCompass = (answers.styleSheet is "sass")
			@includeModernizr = answers.includeModernizr
			@includejQuery = answers.includejQuery
			@testFramework = answers.testFramework
			@currentDate = new Date().getUTCDate()
			@answers = answers
			console.log "Saved yeoman config with"
			console.dir answers
			done()
		).bind(@)
	config: ->
		@config.set("stylesheet", "css")
		@config.set(@answers)
		@config.save()
	writing:
		projectConfigFiles: ->
			@template "_bower.json", "bower.json"
			@template "_package.json", "package.json"
			dotFiles = [
				"gitignore"
				"bowerrc",
				"editorconfig"
				"gitattributes"
				"htaccess"
				"jshintrc"
			]
			@copy file, ".#{file}" for file in dotFiles
			taskRunnerFiles: ->
				@template "_gulpfile.js", "gulpfile.js"
		htmlFiles: ->
			@template "_index.html", "index.html"
			browserFiles = [
				"crossdomain.xml"
				"browserconfig.xml"
				"apple-touch-icon-precomposed.png"
				"humans.txt"
				"robots.txt"
				"tile.png"
				"tile-wide.png"
			]
			@copy file, file for file in browserFiles
		styles: ->
			switch @stylesheet
				when "sass"
					@mkdir "styles/partials"
					@template "styles/partials/_variables.scss", "styles/partials/_variables.scss"
					@template "styles/partials/_helpers.scss", "styles/partials/_helpers.scss"
					@template "styles/partials/_media-queries.scss", "styles/partials/_media-queries.scss"
					@template "styles/sass/_main.scss", "styles/main.scss"
				when "stylus"
					@template "styles/stylus/_main.styl", "styles/main.styl"
				when "css"
					# just plain CSS
					@template "styles/css/_main.css", "styles/main.css"
		assetDirs: ->
			emptyDirectories = [
				"img"
				"fonts"
			]
			for directory in emptyDirectories
				@mkdir directory
		generateScripts: ->
			switch @script
				when "coffee"
					@template "scripts/_main.coffee", "scripts/main.coffee"
				else
					@template "scripts/_main.js", "scripts/main.js"