const gulp = require('gulp');

gulp.task('copy:icons', function () {
  return gulp
    .src(['nodes/**/*.svg', 'credentials/**/*.svg'], { base: '.' })
    .pipe(gulp.dest('dist'));
});
