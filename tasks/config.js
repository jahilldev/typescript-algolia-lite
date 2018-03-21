
/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

module.exports = {

   asset: {
      manifest: 'manifest.json',
      vendor: 'vendor.js',
      client: 'client.js',
      styles: 'style.css',
      fonts: 'fonts.css'
   },

   csproj: {
      name: 'IDL.Web.Vc.csproj',
      xpath: '/xmlns:Project/xmlns:ItemGroup[xmlns:Content]',
      xmlns: 'http://schemas.microsoft.com/developer/msbuild/2003',
      element: 'Content',
      attribute: 'Include',
      dist: 'Content\\dist\\'
   },

   path: {
      root: './',
      dist: './dist/',
      src: './src/',
      manifest: './dist/',
   },

   scss: {
      lintYml: './sass-lint.yml',
      development: 'development.scss',
      production: 'production.scss'
   },

   uglify: {
      compress: {
         dead_code: true,
         unused: true,
         drop_console: true
      }
   },

   hash: {
      enable: {
         hashLength: 8,
         template: '<%= name %>-<%= hash %><%= ext %>'
      },
      disable: {
         template: '<%= name %><%= ext %>'
      }
   }

};
