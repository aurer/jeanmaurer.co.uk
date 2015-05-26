module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON 'package.json'

    less: {
      options: {
        compress: true,
        sourceMap: true,
        sourceMapRootpath: '/'
      }
      dist: {
        files: {
          'dist/css/screen.css': 'src/less/screen.less'
        }
      }
    }

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      }
      files: {
        expand: true
        flatten: true
        src: 'dist/css/*.css'
        dest: 'dist/css/'
      }
    }

    uglify: {
      options: {
        beautify: true
      }
      main: {
        files: {
          'dist/js/main.js': ['src/js/quicklook.js', 'src/js/main.js']
        }
      }
    }

    imagemin: {
      dynamic: {
        files: [{
          expand: true
          cwd: 'src/images'
          src: ['*']
          dest: 'dist/images/'
        }]
      }
    }

    watch: {
      less: {
        files: 'src/less/**/*.less'
        tasks: ['less', 'autoprefixer']
      },
      js: {
        files: 'src/js/**/*.js'
        tasks: ['uglify']
      },
      images: {
        files: 'src/images/*'
        tasks: ['imagemin']
      }
      grunt: {
        files: 'gruntfile.coffee'
      }
    }

    browserSync: {
      bsFiles: {
          src : ['dist/css/*.css', 'dist/js/*.js', 'dist/images/*', 'index.html', 'includes/*.html']
      },
      options: {
        proxy: 'jeanmaurer.dev'
        watchTask: true
        ghostMode: {
          clicks: true
          location: false
          forms: true
          scroll: false
        }
      }
    }
  }

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-browser-sync'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'

  grunt.registerTask('default', ['less', 'uglify', 'imagemin']);
  grunt.registerTask('dev', ['less', 'browserSync', 'watch']);
