const gulp = require('gulp');

gulp.task('copy:icons', function () {
  return gulp.src('nodes/**/*.svg').pipe(gulp.dest('dist/nodes'));
});

