var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true});

gulp.task('pre-istambul-test', ['clean-coverage'], function() {
    return gulp.src(['app/src/main/**/*.js'])
        // Covering files
        .pipe($.istanbul())
        // Force `require` to return covered files
        .pipe($.istanbul.hookRequire());
});

gulp.task('test-istambul', ['pre-istambul-test'], function() {
    return gulp.src(['app/src/test/**/*.js'])
        .pipe($.jasmine())
        .pipe($.plumber(function() {
        }))
        .pipe($.istanbul.writeReports({
            dir: './app/src/coverage'
        }))
        .pipe($.istanbul.enforceThresholds({
            thresholds: {
                global: 0
            }
        }));
});

gulp.task('unit-test', function() {
    return gulp.src(['app/src/test/**/*.js'])
        .pipe($.jasmine());
});

gulp.task('integration-test', function() {
    $.env = {
        vars: {
            NODE_ENV: 'test'
        }
    };
    return gulp.src(['app/src/integration/**/*.js'])
        .pipe($.jasmine());
});

gulp.task('unit-test-watch', function() {
    gulp.watch('app/src/**/*.js', ['unit-test']);
});

gulp.task('test', ['unit-test', 'integration-test']);
