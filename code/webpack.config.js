const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");  
var config = {
    
  devtool: 'source-map',

   entry: './main.js',
	
   output: {
      
      filename: 'index.js',
   },

	
   devServer: {
      inline: true,
      port: 3000,
      host: "localhost.thermofisher.com",
      proxy: {
      '/nm': {
        target: 'http://dev2.apps.thermofisher.com',
        secure: false
      },
      '/dhap-components': {
        target: 'http://dev2.apps.thermofisher.com',
        secure: false
      }
    }
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }

      ]
   },
   plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  // new webpack.optimize.DedupePlugin(),
   new webpack.optimize.ModuleConcatenationPlugin(),
  //  new webpack.optimize.UglifyJsPlugin(),
   // new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({   
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
],
}

module.exports = config;