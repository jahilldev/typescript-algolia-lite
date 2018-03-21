const webpack = require('webpack-stream');
const tap = require('gulp-tap');
const source = require('vinyl-source-stream');
const named = require('vinyl-named');
const buffer = require('vinyl-buffer');
const del = require('del');
const fs = require('fs');
const path = require('path');
const setup = require('./webpack');
const manifest = require('./utility/js-manifest');
const error = require('./error');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const DEBUG = process.argv.includes('--debug');
const RELEASE = process.argv.includes('--release');


/* -----------------------------------
 *
 * Hash
 *
 * -------------------------------- */

module.exports = (config, gulp) => {

   const folder = `${config.path.src}client/`;
   const files = fs.readdirSync(folder);
   const entry = files.map(f => folder + f);

   return () => {

      return gulp
      .src(entry)
      .pipe(
         named()
      )
      .pipe(
         webpack(setup)
      )
      .on('error', error)
      .pipe(
         gulp.dest(config.path.dist)
      )
      .pipe(
         tap(
            manifest(config, gulp)
         )
      );

   }

};
