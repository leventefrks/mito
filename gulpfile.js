var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    bs = require('browser-sync').create();


gulp.task('styles', function(){
    return gulp.src('src/scss/base.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['styles']);
    gulp.watch("*.html").on('change', bs.reload);
});