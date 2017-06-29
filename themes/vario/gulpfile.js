var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-clean-css');

var scripts = [
	"assets/src/_js/Core/Kube.js",
	"assets/src/_js/Core/Kube.Plugin.js",
	"assets/src/_js/Core/Kube.Animation.js",
	"assets/src/_js/Core/Kube.Detect.js",
	"assets/src/_js/Core/Kube.FormData.js",
	"assets/src/_js/Core/Kube.Response.js",
	"assets/src/_js/Core/Kube.Utils.js",
	"assets/src/_js/Message/Kube.Message.js",
	"assets/src/_js/Sticky/Kube.Sticky.js",
	"assets/src/_js/Toggleme/Kube.Toggleme.js",
	"assets/src/_js/Offcanvas/Kube.Offcanvas.js",
	"assets/src/_js/Collapse/Kube.Collapse.js",
	"assets/src/_js/Dropdown/Kube.Dropdown.js",
	"assets/src/_js/Tabs/Kube.Tabs.js",
	"assets/src/_js/Modal/Kube.Modal.js"
];

gulp.task('theme', function() {
    return gulp.src('assets/scss/theme.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(rename('theme.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('kube', function() {
    return gulp.src('assets/src/kube.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(rename('kube.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('combine', function() {
    return gulp.src([
            'assets/src/_scss/_variables.scss',
            'assets/src/_scss/mixins/_breakpoints.scss',
            'assets/src/_scss/mixins/_fonts.scss',
            'assets/src/_scss/mixins/_flex.scss',
            'assets/src/_scss/mixins/_grid.scss',
            'assets/src/_scss/mixins/_utils.scss',
            'assets/src/_scss/mixins/_buttons.scss',
            'assets/src/_scss/mixins/_gradients.scss',
            'assets/src/_scss/mixins/_labels.scss'
        ])
        .pipe(concat('kube.scss'))
        .pipe(gulp.dest('assets/dist/scss'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('kube.js'))
        .pipe(gulp.dest('assets/javascript'))
        .pipe(rename('kube.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/javascript'));
});

gulp.task('watch', function() {

    gulp.watch(scripts, ['scripts']);
    gulp.watch(['assets/scss/*.scss', 'assets/src/_scss/*.scss', 'assets/src/_scss/components/*.scss', 'assets/src/_scss/mixins/*.scss'], ['kube', 'theme', 'combine']);

});

gulp.task('default', ['kube', 'theme', 'combine', 'scripts',  'watch']);
