var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minify = require('gulp-clean-css');

var scripts = [
	"themes/vario/assets/src/_js/Core/Kube.js",
	"themes/vario/assets/src/_js/Core/Kube.Plugin.js",
	"themes/vario/assets/src/_js/Core/Kube.Animation.js",
	"themes/vario/assets/src/_js/Core/Kube.Detect.js",
	"themes/vario/assets/src/_js/Core/Kube.FormData.js",
	"themes/vario/assets/src/_js/Core/Kube.Response.js",
	"themes/vario/assets/src/_js/Core/Kube.Utils.js",
	"themes/vario/assets/src/_js/Message/Kube.Message.js",
	"themes/vario/assets/src/_js/Sticky/Kube.Sticky.js",
	"themes/vario/assets/src/_js/Toggleme/Kube.Toggleme.js",
	"themes/vario/assets/src/_js/Offcanvas/Kube.Offcanvas.js",
	"themes/vario/assets/src/_js/Collapse/Kube.Collapse.js",
	"themes/vario/assets/src/_js/Dropdown/Kube.Dropdown.js",
	"themes/vario/assets/src/_js/Tabs/Kube.Tabs.js",
	"themes/vario/assets/src/_js/Modal/Kube.Modal.js"
];

gulp.task('theme', function() {
    return gulp.src('themes/vario/assets/scss/theme.scss')
        .pipe(sass())
        .pipe(gulp.dest('themes/vario/assets/css'))
        .pipe(rename('theme.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('themes/vario/assets/css'));
});

gulp.task('kube', function() {
    return gulp.src('themes/vario/assets/src/kube.scss')
        .pipe(sass())
        .pipe(gulp.dest('themes/vario/assets/css'))
        .pipe(rename('kube.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('themes/vario/assets/css'));
});

gulp.task('combine', function() {
    return gulp.src([
            'themes/vario/assets/src/_scss/_variables.scss',
            'themes/vario/assets/src/_scss/mixins/_breakpoints.scss',
            'themes/vario/assets/src/_scss/mixins/_fonts.scss',
            'themes/vario/assets/src/_scss/mixins/_flex.scss',
            'themes/vario/assets/src/_scss/mixins/_grid.scss',
            'themes/vario/assets/src/_scss/mixins/_utils.scss',
            'themes/vario/assets/src/_scss/mixins/_buttons.scss',
            'themes/vario/assets/src/_scss/mixins/_gradients.scss',
            'themes/vario/assets/src/_scss/mixins/_labels.scss'
        ])
        .pipe(concat('kube.scss'))
        .pipe(gulp.dest('themes/vario/assets/dist/scss'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('kube.js'))
        .pipe(gulp.dest('themes/vario/assets/javascript'))
        .pipe(rename('kube.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('themes/vario/assets/javascript'));
});

gulp.task('watch', function() {

    gulp.watch(scripts, ['scripts']);
    gulp.watch(['themes/vario/assets/scss/*.scss', 'themes/vario/assets/src/_scss/*.scss', 'themes/vario/assets/src/_scss/components/*.scss', 'themes/vario/assets/src/_scss/mixins/*.scss'], ['kube', 'theme', 'combine']);

});

gulp.task('default', ['kube', 'theme', 'combine', 'scripts',  'watch']);
