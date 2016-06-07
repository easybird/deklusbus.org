const pug = require("gulp-pug");
const gulp = require("gulp");
const livereload = require("gulp-livereload");
const connect = require("gulp-connect");
const path = require("path");
const runSequence = require('run-sequence');


gulp.task("default", function () {
    console.log(". tasks");
    console.log("├───render-view");
});

gulp.task('render-view', function buildHTML() {
    console.log("START RENDERING VIEWS");
    return gulp
        .src('views/root/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('.'));
});

gulp.task('develop', ['connect', 'watch']);

gulp.task('connect', function (done) {
    runSequence('render-view', function () {
        connect.server({
            root: [path.resolve()],
            livereload: true
        });
        done();
    });
});

gulp.task('watch', function () {
    console.log("Changes detected, reload server ");
    gulp.watch(['./views/**/*.pug'], ['reload']);
});

gulp.task('reload', function (done) {
    runSequence('render-view', function () {
        gulp.src('.')
            .pipe(connect.reload());
        done();
    })
});
