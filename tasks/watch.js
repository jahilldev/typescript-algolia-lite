const sequence = require('gulp-sequence');
const error = require('./error');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const release = process.argv.includes('--release');


/* -----------------------------------
 *
 * Watch
 *
 * -------------------------------- */

module.exports = (config, gulp) => {

   return () => {
      
      gulp.watch([
         './package.json'
      ], () => {
   
         sequence(
            ['js:client']
         )(error);
   
      });
   
      gulp.watch([
          config.path.src + '**/*.ts'
      ], () => {
   
         sequence(
            ['js:lint', 'js:client']
         )(error);
   
      });
   
      gulp.watch([
         config.path.src + '**/*.scss'
      ], () => {
   
         sequence(
            ['css:lint', 'css:build']
         )(error);
   
      });

   };

};
