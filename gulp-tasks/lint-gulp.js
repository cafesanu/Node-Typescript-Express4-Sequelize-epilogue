var gulp = require('gulp'),
    stylish = require('tslint-stylish'),
    $ = require('gulp-load-plugins')({lazy: true}); // eslint-disable-line id-length

gulp.task('lint', ['integration-test-ci'], function() {
    return gulp.src(['app/src/main/**/*.ts'])
        .pipe($.plumber())
        .pipe($.tslint())
        .pipe($.tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
});
