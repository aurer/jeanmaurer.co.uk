var server = require('browser-sync');
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var del = require('del');
var fs = require('fs');

// Compile less
gulp.task('less', function() {
	gulp.src(['src/less/*.less'])
		.pipe(plumber())
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest('assets/css'))
		.pipe(server.stream());
});

// Compile JS
gulp.task('js', function() {
	return gulp.src('src/js/main.js')
		.pipe(plumber())
		.pipe(gulp.dest('assets/js'))
		.pipe(server.stream());
});

// Setup local server with injection
gulp.task('serve', function() {
    server.init({
        proxy: 'jeanmaurer.dev'
    });
    gulp.watch("src/less/**/*", ['less']);
    gulp.watch("src/js/**/*", ['js']);
    gulp.watch("site/**/*").on('change', server.reload);
});

// Clean the build folder
gulp.task('clean', function() {
	return del('assets/*');
});

gulp.task('default', ['less', 'js']);

gulp.task('dev', ['default', 'serve']);
