const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const fs = require('fs');
const config = require('./config');


/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const DEBUG = process.argv.includes('--debug');
const RELEASE = process.argv.includes('--release');


/* -----------------------------------
 *
 * Webpack
 *
 * -------------------------------- */

module.exports = {

   context: path.join(__dirname, config.path.src),

   cache: !RELEASE,

   output: {
      filename: !RELEASE ? '[name].js' : '[name].js',
      chunkFilename: !RELEASE ? 'c-[id].js' : 'c-[id]-[chunkhash:8].js',
      jsonpFunction: '__VC__',
      publicPath: '/content/dist/'
   },

   resolve: {
      modules: [
         'node_modules'
      ],
      extensions: [
         '.ts',
         '.js',
         '.json'
      ]
   },

   module: {
      rules: [
         {
            test: /\.ts/, 
            use: [
            {
               loader: 'ts-loader'
            }
            ]
         }
      ]
   },

   plugins: [

      new webpack.LoaderOptionsPlugin({
         minimize: !DEBUG,
         debug: DEBUG
      }),

      new webpack.optimize.CommonsChunkPlugin({
         name: 'shared',
         minChunks: (item, count) => count > 1
      }),

      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: (item, count) => /node_modules/.test(item.resource)
      }),

      new webpack.optimize.OccurrenceOrderPlugin(true),

      ...RELEASE ? [

         new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false,
            sourceMap: false,
            compress: {
               unused: true,
               dead_code: true,
               screw_ie8: true,
               warnings: false,
               drop_console: true,
               drop_debugger: true,
               conditionals: true,
               evaluate: true,
               sequences: true,
               booleans: true,
               passes: 1
            }
         })

      ] : []

   ]

};