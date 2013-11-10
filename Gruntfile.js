module.exports = function(grunt) {
	
	grunt.initConfig({

		// Load the rufio config
		rufio: grunt.file.readJSON('rufio.json'),

		// Asset manager
		assets: {
			jsDev: {
				files: [{
					cwd: '<%= rufio.build.directory %>',
					src: [
						'js/vendor/modernizr.js',
						'js/vendor/jquery.js',
						'js/{*.js,**/*.js}'
					],
					dest: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/partials/scripts.html'
				}]
			},
			js: {
				files: [{
					cwd: '<%= rufio.build.directory %>',
					src: [
						'js/app.min.js'
					],
					dest: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/partials/scripts.html'
				}]
			},
			css: {
				files: [{
					cwd: '<%= rufio.build.directory %>',
					src: ['css/*.css'],
					dest: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/partials/styles.html'
				}],
				options: {
					type: 'link'
				}
			}
		},

		// Clean before building
		clean: {
			build: {
				src: ['<%= rufio.build.directory %>']
			}
		},

		// For development, runs watch task along side the connect task
		concurrent: {
			watch: {
				tasks: ['connect', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		// Serves the built site
		connect: {
			server: {
				options: {
					port: 9000,
					base: '<%= rufio.build.directory %>',
					keepalive: true
				}
			}
		},

		// Copy assets from template to build dir
		copy: {
			js: {
				files: [{
					expand: true,
					cwd: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/js',
					src: '{**/*.js,*.js}',
					dest: '<%= rufio.build.directory %>/js/'
				}]
			},
			media: {
				files: {
					'<%= rufio.build.directory %>/': '<%= rufio.media.directory %>/**'
				}
			}
		},

		// Minify the html
		htmlmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= rufio.build.directory %>',
					src: '{**/*.html,*.html}',
					dest: '<%= rufio.build.directory %>'
				}],
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					removeOptionalTags: true
				}
			}
		},

		// Copy and compress the images
		imagemin: {
			dev: {
				options: {
					optimizationLevel: 0
				},
				files: [{
					expand: true,
					cwd: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= rufio.build.directory %>/images'
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= rufio.build.directory %>/images'
				}]
			}
		},

		// Prettify the development html
		prettify: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%= rufio.build.directory %>',
					src: '{**/*.html,*.html}',
					dest: '<%= rufio.build.directory %>'
				}],
				options: {
					indent_char: '\t',
					indent: 1,
					indent_scripts: 'normal',
					brace_style: 'end-expand'
				}
			}
		},

		// Compile sass files
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'<%= rufio.build.directory %>/css/app.css' : '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/scss/app.scss'
				}
			},
			build: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= rufio.build.directory %>/css/app.min.css' : '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/scss/app.scss'
				}
			}
		},

		// Minify svg assets
		svgmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/images',
					src: ['**/*.svg'],
					dest: '<%= rufio.build.directory %>/images'
				}]
			}
		},
		
		// Minify javascript for production build
		uglify: {
			build: {
				files: {
					'<%= rufio.build.directory %>/js/app.min.js' : [
						'<%= rufio.themes.directory %>/<%= rufio.themes.active %>/js/vendor/*.js',
						'<%= rufio.themes.directory %>/<%= rufio.themes.active %>/js/{**/*.js,*.js}'
					]
				}
			}
		},

		// Watch for file changes and build as needed
		watch: {
			options: {
				livereload: true
			},
			theme: {
				files: ['{themes,filters}/**'],
				tasks: ['rufio-dev', 'prettify']
			},
			content: {
				files: ['{posts,pages}/**'],
				tasks: ['rufio-dev', 'prettify']
			},
			js: {
				files: ['<%= rufio.themes.directory %>/<%= rufio.themes.active %>/js/**'],
				tasks: ['copy']
			},
			sass: {
				files: ['<%= rufio.themes.directory %>/<%= rufio.themes.active %>/scss/**'],
				tasks: ['sass:dev']
			}
		}

	});

	// Register npm tasks
	[
		'grunt-contrib-clean',
		'grunt-contrib-connect',
		'grunt-contrib-copy',
		'grunt-contrib-htmlmin',
		'grunt-contrib-imagemin',
		'grunt-contrib-sass',
		'grunt-contrib-uglify',
		'grunt-contrib-watch',
		'grunt-concurrent',
		'grunt-prettify',
		'grunt-svgmin',
		'rufio',
	].forEach(grunt.loadNpmTasks);

	// Register composte tasks
	grunt.util._({
		'default': ['build-dev', 'concurrent:watch'],
		'build': ['clean:build', 'copy', 'uglify:build', 'sass:build', 'assets', 'rufio', 'htmlmin:build', 'svgmin:build', 'imagemin:build', 'imagemin:build', 'copy:media'],
		'build-dev': ['clean:build', 'copy', 'sass:dev', 'assets', 'rufio-dev', 'prettify', 'imagemin:dev', 'svgmin:build', 'copy:media'],
	}).map(function(task, name) {
		grunt.registerTask(name, task);
	});

};
