Title: YeoPress: A Yeoman Generator for WordPress
Date: Thu May 09 2013 23:03:28 GMT-0500 (CDT)
--META--

<div class="media-right large">![image](/media/posts/yeopress-a-yeoman-generator-for-wordpress/yeopress.jpg)</div>

I am practically obsessed with optimizing my workflow, I get super geeky about it.  If it takes more than one command to do something it makes me itch, itch to write a program to do it for me next time.  Enter [Yeoman](http://yeoman.io/), an opinionated web workflow based on the Node.js tools [Yo](https://github.com/yeoman/yo), [Grunt](http://gruntjs.com/) and [Bower](https://github.com/bower/bower).  These tools take care of project scaffolding, task automation and asset management.  They turn complicated tasks into single line commands...and it's awesome!

One of the things that was sorely lacking in the Yeoman community was a full featured integration for WordPress, so I started to write one.  Primarily, YeoPress is a generator which installs WordPress, sets up your `wp-config.php` file, and can install a custom theme.  With one command, and the answers to a few prompts, you can have WordPress installed and configured.  So how does it work?

## Installation

To get started we need to have a few things installed, starting with Node.  Go on over to the [Node](http://nodejs.org/) website and download the installer for your system, there are installers for OSx, Windows and a few Linux distros, so get installing.  Node is the only thing that is required, but there are a few other things that I like to use, so here are some links so you can get them setup: [Git](http://git-scm.com/downloads) & [Sass](http://sass-lang.com/tutorial.html).  With all our complicated installs done, we can move on to installing Yo and YeoPress:

    $ npm install -g yo generator-wordpress

With the new versions of Yo we no longer have to install Bower and Grunt individually. This is because they are listed as peer dependencies and will get installed along side Yo as global modules.  Also, new versions of Yo allow for generators to be installed globally as well, so the generator will be available in any directory you wish to setup WordPress.  Remember when I said how I love tasks that only take one command?  Awesome!

## Running YeoPress

Everything in in place for us to get started with WordPress, so cd to your install directory and run the generator:

    $ cd /path/to/wp
	$ yo wordpress

<div class="media-right">![image](/media/posts/yeopress-a-yeoman-generator-for-wordpress/yeopress-ascii-art.png)</div>

After the nice ASCII art logo (don't ask how long I spent making that....), you get a series of prompts like this:

    What URL will WordPress be installed at (example.com)
    Would you like to initalize a Git repository? (Y)
    Would you like to install WordPress as a submodule? (N)

Questions with answers in parenthesis after do not require an answer, and will use the value in the parenthesis by default.  Once you have answered all of your questions, you get to confirm your answers, then YeoPress will run all the steps to get WP running.  There are a few paths you can take through these questions depending on which answers you give so I will step through some of the key questions and explain what they mean:

### Would you like to initialize a Git repository?

This question is pretty self-explanatory, choose `Y` and a Git repo will be initialized for you.  This will also open up the option of installing WP as a Git submodule, and commit at a few points during the installation.

### Would you like to install WordPress as a submodule?

As mentioned above, this is only available if you chose to use Git.  But what it does is ask you where you would like to install WP, and it will run the commands:

    $ git submodule add git://github.com/WordPress/WordPress.git <YOUR WP INSTALL DIR>
	$ cd <YOUR WP INSTALL DIR
	$ git checkout <WP VERSION TAG>

Now you will have a copy of WordPress that is connected to the official WP Github repo for controlled updates.  Answering `Y` to this question will also change a few configuration values inside your `wp-config.php` to enable a custom directory structure.

### Would you like to install WordPress with the custom directory structure?

If you answered `N` to either of the previous questions, you will get this question.  This allows you to install WP in a custom directory structure, just like what is done if you answer `Y` to both of the above questions.  Basically, this allows you to choose the WP install directory, and a custom `wp-content` directory.  This can be nice as a simple way to disguise the fact that it is a WordPress site, or just to help keep the content separate from WP core.  If you answer yes, the default directories are `wordpress` and `content`, either of which can be changed to fit your needs.

### Install a custom theme?

YeoPress can snag a theme from either a Github repo or a tarball.  If you answer yes to this question you will be prompted to some information about where to download the theme from.  If you choose `git`, you are asked to provide the Github username, repo name and branch name.  This will grab a copy and install it in the directory you specified as the "Destination directory".  For a `tar` install, you just need to give it the url of the tarball and it will do the same thing.

**And that is it, now WordPress should be installed and working!!**  Navigate your browser to the url you gave to the prompt, and you should get the *"Famous 5-minute Install"*.  Congratulations on your new WordPress site!!

My goal with YeoPress is to help make it even more quick and simple to get a WP site up and running with the modern workflow tools available through Node.  Hopefully I will be following this up with a few more posts on how YeoPress enabled themes can be used with Bower and Grunt, so stay tuned!

*P.S. Anyone who is interested in helping out by getting more features into YeoPress, shoot me an email, I am working on a version 1.0 that will re-structure things and would love to get peoples help and opinions.*

*P.P.S. Star the [Github repo](https://github.com/wesleytodd/YeoPress)!!*
