import gulp from 'gulp';
import config from '../config';

gulp.task('copy-index-html-to-build-directory', () => {
  gulp.src(config.sourceDirectory + 'index.html')
    .pipe(gulp.dest(config.buildDirectory));
});
