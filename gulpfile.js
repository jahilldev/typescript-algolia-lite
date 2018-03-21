/// <binding ProjectOpened='default' />
const gulp = require('gulp');
const sequence = require('gulp-sequence');
const util = require('gulp-util');
const error = require('./tasks/error');
const config = require('./tasks/config');


/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

function task(task, attr) {
   return require('./tasks/' + task)(config, gulp, attr);
}


/* -----------------------------------
 *
 * JS
 *
 * -------------------------------- */

gulp.task('js:clean', task('clean', 'js'));
gulp.task('js:client', task('js-client'));


/* -----------------------------------
 *
 * Watch
 *
 * -------------------------------- */

gulp.task('watch', task('watch'));


/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

gulp.task('default', sequence(
   ['js:clean'],
   ['js:client'],
   'watch'
));
