var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function() {
    browserSync.init({
        notify: false,
        port: 3000,
        proxy: "localhost:3010",
    })
});

gulp.task('watch', ['browserSync', 'sass'], function(cb) {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('css/**/*.css', browserSync.reload);
});

gulp.task('server', function(cb) {
    exec('node server.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})