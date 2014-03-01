/*
  Grunt buildfile
  */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
    options: {
      livereload: true,
    },
      compass: {
        files: ['_src/compass/sass/*.scss'],
        tasks: ['compass:dist'],
        options: {
          atBegin: true
        }
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['newer:uglify'],
        options: {
          atBegin: true
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['_src/js/*.js'],
        // the location of the resulting JS file
        dest: '_src/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %>\n @modified <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '_src/js',
          src: ['**/*.js'],
          dest: 'js/'
        }]
      }
    },
    compass: {
      // Task
      dist: { // Target
        options: { // Target options
          sassDir: '_src/compass/sass',
          cssDir: 'css',
          environment: 'production'
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', '_src/js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        },
        ignores: ['js/vendor/**']
      }
    },
    gitinfo: {}
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['watch']);

  // build the app and watch
  grunt.registerTask('buildApp', ['concat','watch'])

};
