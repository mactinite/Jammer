var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function () {
    browserSync.init({
        notify: false,
        port: 3000,
        open: "external",
        proxy: {
            target: "localhost:3010"
        }
    })
});

gulp.task('watch', ['browserSync', 'sass'], function (cb) {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('public/**/*.*', browserSync.reload);
    gulp.watch('views/**/*.*', browserSync.reload);
    gulp.watch('app/**/*.*', browserSync.reload);
});