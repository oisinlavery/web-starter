var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

gulp.task('default', function () {
  gulp.start('start');
  gulp.start('watch');
});

gulp.task('start', function(){
  gulp.start('js');
  gulp.start('templates');
  gulp.start('sass');
  gulp.start('html');
});

gulp.task('watch', function(){
  gulp.watch(['src/js/*.js'], ['js']);
  gulp.watch(['src/templates/*.hbs'], ['templates']);
  gulp.watch(['src/sass/*.scss', 'src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/*.html'], ['html']);
});


// libs

gulp.task('libs', function () {
  del(['build/libs'], function(){

    var path = "src/libs/";

    return gulp.src([
      path+'jquery/jquery.js',
      path+'handlebars/handlebars.js',
      path+'greensock/TweenMax.js',
      path+'greensock/utils/Draggable.js',
      path+'greensock/plugins/ThrowPropsPlugin.js',
      path+'bezier-easing/bezier-easing.js',
      path+'utils/md-easing.js'
    ])
    .pipe(plumber(onError))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('build/libs'))
    .pipe(rename('libs-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/libs'));
  });
});


// js

gulp.task('js', function () {
  del(['build/js'], function(){
    return gulp.src(['src/js/*.js'])
    .pipe(plumber(onError))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js/'));
  });
});


// templates

gulp.task('templates', function(){

  del(['build/templates'], function(){
    return gulp.src('src/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Templates',
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/templates/'));
  });
});


// html

gulp.task('html', function () {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('build/'));
});


// sass

gulp.task('sass', function () {
  del(['build/css'], function(){
    return gulp.src('src/sass/app.scss')
    .pipe(plumber(onError))
    .pipe(sass({
      includePaths: ['src/sass/'],
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css/'));
  });

});


// images

gulp.task('images', function(){
  return gulp.src('src/images/**')
    .pipe(gulp.dest('build/images/'));
});

gulp.task('images-min', function(){
  return gulp.src('src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/'));
});






