const gulp = require('gulp'); 
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cssMinify = require('gulp-css-minify');

gulp.task('html', function() {
   return gulp.src('html/*.html')
   .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
   }))
   .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
   return gulp.src('css/**/*.css')
   .pipe(sourcemaps.init())
   .pipe(concat('style.min.css'))
   .pipe(cssMinify())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
   return gulp.src('js/*.js')
   .pipe(sourcemaps.init())
   .pipe(concat('script.min.js'))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('dist/'));
});


gulp.task('watch', function () {
   gulp.watch('css/**/*.css', gulp.series(['css']));
   gulp.watch('html/*.html', gulp.series(['html']));
});