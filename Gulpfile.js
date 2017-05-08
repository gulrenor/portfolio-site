//Gulpfile.js

// Common
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

// S/CSS variables
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

// JS variables
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Pug
var pug = require('gulp-pug');

// Hugo
var exec = require('child_process').exec;
var bg = require('gulp-bg');

// Hugo config
var hugoTheme = 'kal';
var dirSass_In = 'src/sass/**/*.scss';
var dirCSS_Out = 'www/css/';
var dirJS_In = 'src/js/**/*.js';
var dirJS_Out = 'www/js/';
var dirPug_In = 'src/pug/**/!(_)*.pug'; // Prevents _includes
var dirHTML_Out = 'www/';

// Hugo
gulp.task('hugo-build', function(callback) {
  exec('hugo', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});
gulp.task('hugo-server', function(callback) {
  bg('hugo server', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

// S/CSS task
gulp.task('styles', function() {
  gulp.src(dirSass_In)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirCSS_Out))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(dirCSS_Out));
});

// JS task
gulp.task('scripts', function() {
  gulp.src(dirJS_In)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(dirJS_Out))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(dirJS_Out));
});

// Pug task
gulp.task('html', function() {
  gulp.src(dirPug_In)
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(dirHTML_Out));
})

//TODO: Add SVG minify task

// Watch
gulp.task('default', function() {
  livereload.listen();
  //gulp.watch(['hugo-server']);
  gulp.watch(dirSass_In, ['styles']);
  gulp.watch(dirJS_In, ['scripts']);
  gulp.watch(dirPug_In, ['html']);
});
