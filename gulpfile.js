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
    var tsProject = $.typescript.createProject('tsconfig.json');

    return gulp.src('app/**/*.ts')
        .pipe($.typescript(tsProject))
        .pipe(gulp.dest('build'));
});

gulp.task('watch-ts', ['ts'], function() {
    gulp.watch('app/src/main/**/*.ts', ['ts']);
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

