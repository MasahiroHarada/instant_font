import gulp from 'gulp';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';

const paths = {
  scripts: {
    src: 'src/js/',
    dist: 'extension/js/'
  },
  styles: {
    sass: 'src/sass/',
    css: 'extension/css/'
  }
};

// ===================================
// JavaScript ES2015-2016
// ===================================
gulp.task('build', () => {
  browserify({
    entries: [ `${paths.scripts.src}content_scripts.js` ],
    transform: [ 'babelify' ]
  })
  .bundle()
  .pipe(source('content_scripts.js'))
  .pipe(gulp.dest(paths.scripts.dist));
});

// ===================================
// Sass -> CSS
// ===================================
gulp.task('sass', () => {
  const processors = [ cssnext() ];
  gulp.src(`${paths.styles.sass}**/*.scss`)
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.styles.css));
});

// ===================================
// Watch
// ===================================
gulp.task('watch', () => {
  gulp.watch(`${paths.scripts.src}**/*.js`, [ 'build' ]);
  gulp.watch(`${paths.styles.sass}**/*.scss`, [ 'sass' ]);
});
