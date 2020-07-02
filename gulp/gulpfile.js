const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const babel = require('gulp-babel');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('src/views/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp.src('src/css/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false,
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
}

function js() {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
}

function server() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('src/css/**/*.less', css);
  gulp.watch('src/js/**/*.js', js);
  gulp.watch('src/views/**/*.pug', html);
}

exports.default = server;
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = gulp.series(html, css, js);
