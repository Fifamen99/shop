const gulp = require('gulp'); 
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cssMinify = require('gulp-css-minify');
const rename = require('gulp-rename');


// Оброблюємо помилки
var error = function (e) {
	console.log('--------------------------------------');
	console.error('* ' + e.message);

	if (typeof e.cause != 'undefined') {
		console.error('- ' + e.cause.filename + ', line '  + e.cause.line);
	}

	console.log('--------------------------------------');
};


// gulp.task('html', function() {
//    return gulp.src('html/*.html')
//    .pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//    })).on('error', error)
//    .pipe(gulp.dest('./'));
// });





// Формуємо з частини html один файл розділу
gulp.task('html', function () {
	return gulp.src(['html/page--*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		})).on('error', error)
		.pipe(rename(function (path) {
			path.basename = path.basename.split('page--').join('');
			path.extname = ".html";
		})).on('error', error)
		.pipe(gulp.dest('.'));
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
   gulp.watch('js/*.js', gulp.series(['js']));
   gulp.watch('css/**/*.css', gulp.series(['css']));
   gulp.watch('html/*.html', gulp.series(['html']));
});