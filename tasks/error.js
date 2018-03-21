const util = require('gulp-util');


/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

module.exports = (err) => {

   if (!err) {

      return;

   }

   const name = util.colors.red(err.name + ':');
   const message = err.message;
   const output = util.colors.yellow(message.replace(/\n|\r/g, ''));

   util.log(name);
   util.log(output);
   
}
