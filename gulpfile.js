var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}), // eslint-disable-line id-length
    requireDir = require('require-dir');

requireDir('./gulp-tasks');

gulp.task('serve', ['ts'], function() {
    $.nodemon({
        script: 'build/src/main/app.js',
        ext: 'js',
        env: {
            NODE_ENV: 'development',
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        $.util.log('Restarting', $.util.colors.red());
    });
});

gulp.task('ts', ['tsd'], function() {
    var tsProject = $.typescript.createProject('tsconfig.json');

    return gulp.src('app/**/*.ts')
        .pipe($.typescript(tsProject))
        .pipe(gulp.dest('build'));
});

gulp.task('tsd', function(done) {
    return $.tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, done);
});

gulp.task('watch-ts', ['ts'], function() {
    gulp.watch('app/src/main/**/*.ts', ['ts']);
});

