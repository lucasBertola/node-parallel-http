var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var beautify    = require('gulp-beautify');
var uglify      = require("gulp-uglify");
var renameGulp  = require("gulp-rename");
var runSequence = require('run-sequence');
var browserify = require('browserify');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');

gulp.task('jshint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('beautify', function() {
  return gulp.src('./src/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./src/'))
});

gulp.task('minifyjs', function () {
   return gulp.src('./dist/node-parallel-http.js')
    .pipe(renameGulp("node-parallel-http.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
   return gulp.src('./src/*.js')
    .pipe(concat('node-parallel-http.js'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default',function(callback){
  runSequence('beautify','build','minifyjs',callback)
}
);


gulp.task('test',['default'], function () {
   return gulp.src('test/test.js', {read: false})
        .pipe(mocha());
});

