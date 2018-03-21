const hash = require('gulp-hash');
const when = require('gulp-if');
const rename = require('gulp-rename');
const del = require('del');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const DEBUG = process.argv.includes('--debug');
const RELEASE = process.argv.includes('--release');


/* -----------------------------------
 *
 * Manifest
 *
 * -------------------------------- */

module.exports = (config, gulp) => {

   return (file, t) => {

      let name = file.basename.split('.')[0];

      const parts = name.split('-');
      const chunk = parts[0] === 'c';
      const clear = RELEASE && !chunk;
      const space = RELEASE && parts.length > 2;

      if(!chunk && space) {
         
         parts.pop();

      }

      if(!chunk) {

         name = parts.join('-') + file.extname;

      }

      return gulp
      .src(file.path)
      .pipe(
         when(!chunk,
            rename(name)
         )
      )
      .pipe(
         hash(
            (!RELEASE || chunk) ? config.hash.disable : config,hash.enable
         )
      )
      .pipe(
         when(!chunk,
            gulp.dest(config.path.dist)
         )
      )
      .pipe(
         hash.manifest(
            config.asset.manifest, {
               append: true,
               deleteOld: false,
               sourceDir: config.path.manifest
            }
         )
      )
      .pipe(
         gulp.dest(config.path.manifest)
      )
      .on('end', () => {
         if(clear) {
             del(file.path);
         };
      });

   }

};