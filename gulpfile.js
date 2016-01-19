var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}), // eslint-disable-line id-length
    requireDir = require('require-dir'),
    typings = require('typings');

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

gulp.task('ts', ['typings'], function() {
    var tsProject = $.typescript.createProject('tsconfig.json'),
        fail = false;

    return gulp.src('app/src/**/*.ts')
        .pipe($.plumber(function() {
            fail = true;
        }))
        .pipe($.typescript(tsProject, undefined, $.typescript.reporter.longReporter())) // eslint-disable-line no-undefined
        .pipe(gulp.dest('build'))
        .on('end', function() {
            if (fail) {
                process.exit(1);
            }
        });
});

gulp.task('typings', function(done) {
    var options = {
        save: false,
        saveDev: false,
        ambient: false,
        cwd: __dirname,
        production: false
    };

    typings.install(options).then(function() {
        done();
    });
});

gulp.task('ci', ['lint']);

