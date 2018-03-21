const del = require('del');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const release = process.argv.includes('--release');


/* -----------------------------------
 *
 * Clean
 *
 * -------------------------------- */

module.exports = (config, gulp, type) => {

   return () => {
      
      return del([
         config.path.dist + `*.${type}*`
      ]);

   };

};
