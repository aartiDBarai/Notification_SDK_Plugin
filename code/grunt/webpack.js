const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }), // Helps identify common parts of a require hierarchy
   new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({   
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
];
var webpackModules = {
  loaders: [
   {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        
            query: {
               presets: ['es2015', 'react']
            }
         },// loaders can take parameters as a querystring
         
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
};

var config = {
  

    dev: {
     entry: './main.js',
  
   output: {
     
      filename: './build/bundle.js',
   },
   plugins: plugins,
    module: webpackModules,
    
    // Configure the console output
    stats: {
      colors: true,
     modules: true,
      
    },
    progress: true,
    keepalive: true,
    bail: true,
    devtool: 'source-map',
    
  },


  // Exclude any dev like configuration for any production like env
  prerelease: {
   entry: './main.js',
  
   output: {
     
      filename: './build/bundle.js',
   },
    
  }
  
}

module.exports = config;