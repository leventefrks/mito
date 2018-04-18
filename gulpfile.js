const gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    purify = require('gulp-purifycss'),
    htmlmin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    bs = require('browser-sync').create();


gulp.task('styles', () => {
    return gulp.src('src/scss/base.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/css/'))
        .pipe(bs.reload({ stream: true }))
});

gulp.task('htmlmin', function () {
    return gulp.src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('postcss', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(purify('index.html'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', () => {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch("src/scss/*.scss", ['styles', 'htmlmin']);
    gulp.watch("*.html").on('change', bs.reload);
});