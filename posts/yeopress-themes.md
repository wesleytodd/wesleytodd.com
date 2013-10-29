Title: YeoPress Themes
Date: Sun May 12 2013 00:24:49 GMT-0500 (CDT)
--META--

<div class="media-full">![image](/media/posts/yeopress-themes/yeopress-theme.png)</div>

The core of any WordPress site is it's theme.  This is where WP developers spend most of their editing time and what is responsible for most of the work of rendering the site content.  So what does YeoPress have to do with this?  The answer is: **Very Little**.  A YeoPress theme is just a normal WordPress theme, nothing different needs to happen for everything to work as it normally would.  *If nothing is different, then why talk about it?*  Because this is my party, and I'll cry if I want to.  No really, setting up Grunt configurations can be confusing at first, and YeoPress has a default theme that shows of some simple ways to integrate Grunt into your workflow.  Also, YeoPress will automatically run a setup task for you when you first install the theme using the generator (`yo wordpress`).  So lets just dig in.

To start, let's go over some of the basics of Grunt, and its configuration file, `Gruntfile.js`.  Every Grunt file needs to have a `module.exports` function that contains a call to `grunt.initConfig()`.  The object passed into this function will be used to configure all of the settings for your grunt tasks.  Lets take a look at part of the Grunt file from the YeoPress theme:

```javascript
// Module.exports gets run by grunt-cli
module.exports = function(grunt) {

	// That init function I talked about
	grunt.initConfig({

		// Config values for the regarde task
		regarde : {
			// Targets for sass, js and php
			sass : {
				files : ['scss/**/*.scss'],
				tasks : ['sass:dev', 'livereload']
			},
			js : {
				files : ['js/**/*.js'],
				tasks : ['jshint', 'livereload']
			},
			php : {
				files : ['**/*.php'],
				tasks : ['livereload']
			}
		}

		// ... More code

	});

	// ... More code

	// Load the regarde tasjust k
	grunt.loadNpmTasks('grunt-regarde');

};
```

As you can see in the above Grunt configuration, we have the required lines and a configuration for the Regarde task.  This task is a file watcher that will run other tasks when a file changes.  Notice that there are three "Targets" for this task (sass, js & php).  Targets are a way that Grunt can have multiple configurations for different situations.  In this example, we define a `sass` target that tells Regarde to watch the files in the scss directory (`scss/**/*.scss`), and run two tasks when the change (`'sass:dev', 'livereload'`).  There is one last thing that we need for this task to be fully setup, we need to load the task by calling `loadNpmTasks`.

The default YeoPress theme comes with a few different tasks setup, for more information please check out their docs:

- Regarde ([grunt-regarde](https://npmjs.org/package/grunt-regarde))
- Live Reload ([grunt-contrib-livereload](https://npmjs.org/package/grunt-contrib-livereload))
- Sass ([grunt-contrib-sass](https://npmjs.org/package/grunt-contrib-sass))
- JSHint ([grunt-contrib-jshint](https://npmjs.org/package/grunt-contrib-jshint))
- Bower ([grunt-bower-requirejs](https://npmjs.org/package/grunt-bower-requirejs))
- RequireJS ([grunt-contrib-requirejs](https://npmjs.org/package/grunt-contrib-requirejs))

Since this has just been a fun personal project so far, I have only integrated the things I use, but I would love for some community involvement to really pimp out the default theme so that it is a good all around example of a WP theme, with a fully featured Grunt configuration for everything from CoffeeScript to Twitter Bootstrap integration.  So please, if you want to help out, head over to the [Github](https://github.com/wesleytodd/YeoPress/tree/template) and submit your pull requests!

OK, moving on to the part that is actually different in YeoPress...the setup task.  Usually when I am installing a theme there are a few setup things that need to be done, like grabbing the newest jQuery version.  Because we are using Bower for package management (If you need more information on this, [go here](http://bower.io/)), all we need to get our up-to-date assets is run `bower install`.  And to that I say:

> But why should we have to type two commands when one will do just fine?

To solve this problem, YeoPress will try to run `grunt setup` when it installs a new theme.  Now all we need to do is register a task in our theme's grunt file and away we go.  Here is the default themes setup tasks:

```javascript
grunt.registerTask('setup', function() {
	var done = this.async();
	var bower = require('bower').commands;
	bower.install().on('end', function(data) {
		done();
	}).on('data', function(data) {
		console.log(data);
	}).on('error', function(err) {
		console.error(err);
		done();
	});
});
```

Creating your own grunt tasks is very simple, just call `registerTask` and pass in the task name and the function to run.  As you can see here, this one requires the bower module, and runs install.  Easy Peasy.  Now we have our assets in place for the theme.  If we wanted to we could easily add in a line to compile our sass, or just `console.log('Have a nice day!')`.

Now that you have a handle on how to work Grunt into your WordPress theme workflow, you should easily be able to modify your current starter theme for installation with YeoPress.  Let the time savings roll!!
