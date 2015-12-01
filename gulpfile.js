'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');

gulp.task('default', () => {
  gulp.src('lib/md2bbc.js')
  .pipe(rename('md2bbc.min.js'))
  .pipe(sourcemaps.init())
    .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('lib'));
});
