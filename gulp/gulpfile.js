const gulp = require('gulp');
const gulp_less = require('gulp-less');
const babel = require('gulp-babel');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const gulp_autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function css() {
    return gulp.src('src/css/*.less')
        .pipe(sourcemaps.init())
        .pipe(gulp_less())
        .pipe(gulp_autoprefixer({
            cascade: false,
            overrideBrowserslist : ['last 2 versions']
        }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
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
}

function watch() {
    function watcher(path, task) {
        gulp.watch(path, task);
    }
    watcher('src/css/*.less', css);
    watcher('src/js/*.js', js);
}

exports.default = watch;
exports.css = css;
exports.js = js;
exports.build = gulp.series(css, js);