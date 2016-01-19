var gulp = require('gulp');

gulp.task('watch-ts', ['ts'], function() {
    gulp.watch('app/src/main/**/*.ts', ['ts']);
});
