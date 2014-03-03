"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");

function getTestFrameworkOptions(options) {
// setup the test-framework property, Gruntfile template will need this
	this.testFramework = options["test-framework"] || "mocha";
	this.coffee = options.coffee;

	// for hooks to resolve on mocha by default
	options["test-framework"] = this.testFramework;

	// resolved to mocha by default (could be switched to jasmine for instance)
	this.hookFor("test-framework", {
		as:      "app",
		options: {
			options: {
				"skip-install": options["skip-install-message"],
				"skip-message": options["skip-install"]
			}
		}
	});

	this.options = options;
}
var Html5AppGenerator = module.exports = function Html5AppGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	//getTestFrameworkOptions.call(this, options);
	this.on("end", function () {
		this.installDependencies({ skipInstall: options["skip-install"] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(Html5AppGenerator, yeoman.generators.Base);

function getCurrentDate()
{
	return new Date().getUTCDate();
}

Html5AppGenerator.prototype.askFor = function askFor(_) {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			name:    "appname",
			message: "What's the name of your app?",
			default: this._.slugify(this.appname)
		},
		{
			type: "confirm",
			name: "coffee",
			message: "Use coffeescript?"
		},
		{
			type: "confirm",
			name: "includeModernizr",
			message: "Use Modernizr?"
		},
		{
			type: "confirm",
			name: "includejQuery",
			message: "Use jQuery?"
		},
		{
			name: "description",
			message: "Describe your app",
			default: "A sample description"
		},
		{
			name: "authorName",
			message: "What\"s your name?",
			default: "Author name"
		},
		{
			name: "authorEmail",
			message: "What\"s your e-mail?",
			default: "email@somedomain.com"
		},
		{
			name: "authorURL",
			message: "What\"s your website?",
			default: "somedomain.com"
		},
		{
			type: "confirm",
			name: "includeCompass",
			message: "Use compass (scss)?"
		},
		{
			name: "license",
			message: "What's the copyright license?",
			default: "MIT"
		}
	];

	this.prompt(prompts, function (props) {
		this.description = props.description;
		this.appname = props.appname;
		this.authorName = props.authorName;
		this.authorEmail = props.authorEmail;
		this.authorURL = props.authorURL;
		this.license = props.license;
		this.includeModernizr = props.includeModernizr;
		this.coffee = props.coffee;
		this.includejQuery = props.includejQuery;
		this.includeCompass = props.includeCompass;
		this.testFramework = props.testFramework;
		this.currentDate = getCurrentDate();
		cb();
	}.bind(this));
};

Html5AppGenerator.prototype.app = function app() {
	this.template("_package.json", "package.json");
	this.template("_bower.json", "bower.json");
	this.copy("bowerrc", ".bowerrc");
};

Html5AppGenerator.prototype.projectfiles = function projectfiles() {
	this.copy("editorconfig", ".editorconfig");
	this.copy("jshintrc", ".jshintrc");
	this.copy("_gitignore", ".gitignore");
	this.copy("htaccess", "app/.htaccess");
	this.copy("gitattributes", ".gitattributes");
	this.copy("favicon.ico", "app/favicon.ico");
	this.copy("robots.txt", "app/robots.txt");
};

Html5AppGenerator.prototype.createEmptyDirectories = function createEmptyDirectories() {
	this.mkdir("app/scripts");
	this.mkdir("app/styles");
	this.mkdir("app/img");
};

Html5AppGenerator.prototype.generateHTML = function generateHTML() {
	this.template("_index.html", "app/index.html");
};

Html5AppGenerator.prototype.scaffoldGruntFile = function scaffoldGruntFile() {
	this.template("_gruntfile.js", "Gruntfile.js");
};

Html5AppGenerator.prototype.generateStyles = function generateStyles() {
	if (this.includeCompass) {
		this.mkdir("app/styles/partials");
		this.template("styles/partials/_variables.scss", "app/styles/partials/_variables.scss");
		this.template("styles/partials/_helpers.scss", "app/styles/partials/_helpers.scss");
		this.template("styles/partials/_media-queries.scss", "app/styles/partials/_media-queries.scss");
		this.template("styles/main.scss", "app/styles/main.scss");
	}
	else {
		// just plain CSS
		this.template("styles/_main.css", "app/styles/main.css");
	}
};

Html5AppGenerator.prototype.generateScripts = function generateScripts() {
	if (this.coffee) {
		this.template("scripts/_main.coffee", "app/scripts/main.coffee");
	}
	else {
		this.template("scripts/_main.js", "app/scripts/main.js");
	}
};
