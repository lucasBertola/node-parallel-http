var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var beautify = require('gulp-beautify');
var uglify = require("gulp-uglify");
var renameGulp = require("gulp-rename");
var runSequence = require('run-sequence');



gulp.task('jshint', function() {
  return gulp.src('./index.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('beautify', function() {
  gulp.src('./index.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('.'))
});

gulp.task('minifyjs', function () {
   gulp.src('./index.js')
    .pipe(renameGulp("node-parallel-http.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
gulp.task('build', function () {
   gulp.src('./index.js')
    .pipe(renameGulp("node-parallel-http.js"))
    .pipe(gulp.dest('./dist'));
});




gulp.task('default',
	 runSequence('beautify','build','minifyjs')
);