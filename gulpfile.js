var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.src('lib/md2bbc.js')
  .pipe(rename('md2bbc.min.js'))
  .pipe(sourcemaps.init())
    .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('lib'));
});
