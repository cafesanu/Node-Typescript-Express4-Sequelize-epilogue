var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}); // eslint-disable-line id-length

gulp.task('pre-test-coverage', ['clean-coverage', 'ts'], function() {
    return gulp.src(['build/src/main/**/*.js'])
        // Covering files
        .pipe($.istanbul())
        // Force `require` to return covered files
        .pipe($.istanbul.hookRequire());
});

gulp.task('test-coverage', ['pre-test-coverage'], function() {
    return gulp.src(['build/src/test/**/*.js'])
        .pipe($.jasmine())
        .pipe($.plumber(function() {
        }))
        .pipe($.istanbul.writeReports({
            dir: './build/coverage'
        }))
        .pipe($.istanbul.enforceThresholds({
            thresholds: {
                global: 0
            }
        }));
});

gulp.task('unit-test', function() {
    return gulp.src(['build/src/test/**/*-spec.js'])
        .pipe($.jasmine());
});

gulp.task('integration-test', function() {
    $.env({ // eslint-disable-line id-length
        vars: {
            NODE_ENV: 'test'
        }
    });
    return gulp.src(['build/src/integration/**/*-spec.js'])
        .pipe($.jasmine());
        // .pipe($.exit());
});

gulp.task('unit-test-watch', function() {
    gulp.watch('build/src/**/*.js', ['unit-test']);
});

gulp.task('test', ['unit-test', 'integration-test']);
