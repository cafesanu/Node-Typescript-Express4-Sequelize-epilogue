var gulp = require('gulp'),
    del = require('del'),
    $ = require('gulp-load-plugins')({lazy: true}); // eslint-disable-line id-length

gulp.task('clean-coverage', function(done) {
    clean('app/coverage', done);
});

gulp.task('clean-build', function(done) {
    clean('build', done);
});

function clean(path, done) {
    $.util.log($.util.colors.green('Cleaning: ' + path));
    del(path).then(
        function success(paths) {
            $.util.log($.util.colors.green('Done Cleaning: ' + paths.join('\n')));
            done();
        },
        function fail(err) {
            $.util.log($.util.colors.red('ERROR DELETING files. ' + err));
            done();
        }
    );
}

