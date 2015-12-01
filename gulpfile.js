'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let del = require('del');
let runSequence = require('run-sequence');

const DIST = 'dist';

gulp.task('clean', () => {
  return del(DIST);
});

gulp.task('babel', () => {
  return gulp.src('lib/md2bbc.js')
  .pipe($.babel())
  .pipe(gulp.dest(DIST));
});

gulp.task('uglify', () => {
  return gulp.src('dist/md2bbc.js')
  .pipe($.rename('md2bbc.min.js'))
  .pipe($.sourcemaps.init())
    .pipe($.uglify())
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(DIST));
});

gulp.task('default', cb => {
  runSequence(
    'clean',
    'babel',
    'uglify',
    cb
  )
});

gulp.task('test', ['default'], () => {
  return gulp.src('test/test.js', {read: false})
    .pipe($.mocha())
});
