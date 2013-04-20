module.exports = function(grunt) {
	
	grunt.initConfig({
		rufio : grunt.file.readJSON('config.json'),
		connect : {
			server : {
				options : {
					port : 9000,
					base : '<%= rufio.build.directory %>',
					keepalive : true
				}
			}
		},
		sass : {
			build : {
				options : {
					style: 'expanded'
				},
				files : {
					'<%= rufio.build.directory %>/css/global.css' : '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/scss/global.scss'
				}
			}
		},
		uglify : {
			build : {
				files : {
					'<%= rufio.build.directory %>/js/global.js' : '<%= rufio.themes.directory %>/<%= rufio.themes.active %>/js/global.js'
				}
			}
		},
		bower : {
			build : {
				dest: '<%= rufio.build.directory %>/js/vendor'
			}
		},
		imagemin : {
			build : {
				files : getThemeImages(grunt.file.readJSON('config.json'))
			}
		}
	});
	

	grunt.loadNpmTasks('generator-rufio');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', ['build', 'imagemin', 'sass', 'uglify', 'bower', 'connect']);

};

var fs = require('fs'),
	path = require('path');

var getThemeImages = function(config) {
	var imagesFolder = path.join(config.themes.directory, config.themes.active, 'images'),
		output = {};
	if (fs.existsSync(imagesFolder)) {
		var images = fs.readdirSync(imagesFolder);
		for (var i in images) {
			if (images[i].indexOf('.') !== 0) {
				output['<%= rufio.build.directory %>/images/' + images[i]] = imagesFolder + '/' + images[i];
			}
		}
	}
	return output;
};


