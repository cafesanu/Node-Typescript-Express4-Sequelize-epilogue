var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}); // eslint-disable-line id-length

gulp.task('pre-test-coverage', ['clean-coverage', 'ts'], function() {
    return gulp.src(['build/main/**/*.js'])
        // Covering files
        .pipe($.istanbul())
        // Force `require` to return covered files
        .pipe($.istanbul.hookRequire());
});

gulp.task('test-coverage', ['pre-test-coverage'], function() {
    return gulp.src(['build/test/**/*-spec.js'])
        .pipe($.plumber(function() {
            process.exit(1);
        }))
        .pipe($.jasmine())
        .pipe($.istanbul.writeReports({
            dir: './build/coverage'
        }))
        .pipe($.istanbul.enforceThresholds({
            thresholds: {
                global: 0
            }
        }));
});

gulp.task('unit-test', ['ts'], function() {
    return gulp.src(['build/test/**/*-spec.js'])
        .pipe($.jasmine());
});

gulp.task('integration-test', ['ts'], function() {
    $.env({
        vars: {
            NODE_ENV: 'test'
        }
    });
    return gulp.src(['build/integration/**/*-spec.js'])
        .pipe($.jasmine());
});

gulp.task('integration-test-ci', ['test-coverage'], function() {
    $.env({
        vars: {
            NODE_ENV: 'ci'
        }
    });
    return gulp.src(['build/integration/**/*-spec.js'])
        .pipe($.jasmine());
});

gulp.task('unit-test-watch', function() {
    gulp.watch('build/src/**/*.js', ['unit-test']);
});

gulp.task('test', ['unit-test', 'integration-test']);
