Title: CSS For The Modern Developer
Date: Thu May 16 2013 22:55:46 GMT-0500 (CDT)
Status: Draft
--META--

The web is evolving.  Things like the mobile web, web apps, CMS platforms and responsive design are each such large topics that is is almost impossible to keep up with them all.  If you are anything like me, there is only so much you can fit in your head at once.  So what can we do to keep up?  How can we relive our brains from having to keep it all in there at once?  I think that the answer lies in designing systems for organization and re-use.  Everything that we can do to make our day-to-day tasks simpler, will mean that we can push forward on the cool new things happening on the web.

So how does that all apply to CSS?  Over my years working with front-end code, I have found that I spend alot of time thinking about how to organize my code.  Should I break it out into separate files for different parts of the site, should I put helpers classes at the top or bottom of the file, should I put form element styling in it's own file?  There are so many questions, and if you don't have a system, things can get pretty out of hand.  Even worse, if you are on a team, and people don't have the same ideas you can get a mess of repeated styles, or dis-organized code.

There are two things I want to talk about to help us clean up our mess: Tooling & Organization.  With a good understanding of these things, I think that any Front-end Developer can hit the ground running on any project.

## Tooling

If you took your car to get an oil change and the mechanic pulled out a little scissor jack, you would probably think, "Does this guy really know what he is doing?"  Just like the mechanic, we don't want to be stuck with the basic tools that any layman uses.  So what are the best shiny new CSS tools that money can buy?  The ones that top my list are Sass, Grunt, CSSLint and the Chrome Debugger Tools.  I am not going to go over each of these individually, but I want to hit a little on some important features of Sass and Grunt that will be important for how we organize our CSS.

### Sass

So, if you are not familiar with Sass, it is a CSS pre-processor.  What doe that mean exactly?  Sass is a superset of CSS, so all valid CSS id valid Sass.  And when you run the Sass compiler on your files, it turns Sass into CSS.  Sound confusing?  Well, it is actually really easy, lets look at an example.  Take this CSS for a button:

```css
button,
.button,
a.button {
	background: #e37c18;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}
button:hover,
.button:hover,
a.button:hover {
	background: #8f4f0f;
}
```

This is some pretty common setup, we have a button style we want to use in a bunch of places, on `button` tags, on anchors, or maybe other elements.  We also have a `border-radius` on the button that requires a `-webkit-` prefix.  How can Sass help us here?  Sass adds things like variables, mixins and nesting to the CSS syntax, so lets re-write the previous code with Sass:

```css
@mixin border-radius($radius) {
	-webkit-border-radius: $radius;
	border-radius: $radius;
}

$btnColor: #e37c18;

button,
.button,
a.button {
	background: $btnColor;
	@include border-radius(5px);

	&:hover {
		background: darken($btnColor, 20%);
	}
}
```

As you can see, we now have a re-usable `border-radius` mixin, a variable for the button color, and a nested structure for the button styles.  This is not a tutorial on Sass, but you can see that using Sass we are able to write modular code that can be re-used in a way that goes far beyond what is possible with pure CSS.  Great, we have this new tool, but don't we have an extra step to compile the Sass files now?  This is where Grunt comes in.

### Grunt.js

Grunt is the most awesome thing, pretty much ever.  I describe it as the thing that helps me "Automate all the things!!".  In reality it is a task runner, you give it a task to run, which is written in javascript, and it goes off and runs it.  There are lots of modules out there for common Grunt tasks, but the ones we are interested in for CSS are [grunt-contrib-sass](https://npmjs.org/package/grunt-contrib-sass) and [grunt-contrib-csslint](https://npmjs.org/package/grunt-contrib-csslint).  Again, this is not a tutorial on how to get Grunt setup, so I am not going to go in-depth, but here is an example of a grunt config for these modules.

```javascript
grunt.initConfig({
	sass : {
		dev : {
			files : [
				{
					src : ['**/*.scss', '!**/_*.scss'],
					cwd : 'scss',
					dest : 'css',
					ext : '.css',
					expand : true
				}
			],
			options : {
				style : 'expanded'
			}
		},
		production : {
			files : [
				{
					src : ['**/*.scss', '!**/_*.scss'],
					cwd : 'scss',
					dest : 'css',
					ext : '.css',
					expand : true
				}
			],
			options : {
				style : 'compressed'
			}
		}
	},
	csslint : {
		all : {
			options : {
				'star-property-hack' : false,
				'outline-none' : false,
				'ids' : false,
				'box-sizing' : false,
				'unique-headings' : false,
				'unqualified-attributes' : false,
				'regex-selectors' : false
			},
			src : ['css/**/*.css']
		}
	}
});

grunt.registerTask('default', ['sass:dev', 'csslint']);

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-csslint');
```

