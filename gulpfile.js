const gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    purify = require('gulp-purifycss'),
    bs = require('browser-sync').create();


gulp.task('styles', ()=>{
    return gulp.src('src/scss/base.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.reload({stream: true}))
});

gulp.task('postcss', function() {
    return gulp.src('./dist/css/*.css')
      .pipe(purify('index.html'))
      .pipe(gulp.dest('./dist/css'));
  });

gulp.task('browser-sync', ()=> {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], ()=> {
    gulp.watch("src/scss/*.scss", ['styles']);
    gulp.watch("*.html").on('change', bs.reload);
});