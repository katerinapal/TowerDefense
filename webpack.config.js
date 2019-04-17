//var writeFilePlugin = require('write-file-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './TowerDefense.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      path: path.join(__dirname, '/output/'),
      filename: 'TowerDefense.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, '/'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  },
  devServer: {
    contentBase: "./",
    outputPath: path.join(__dirname, 'output')
  },
  plugins: [
	new webpack.ProvidePlugin({
    		$: 'jquery',
    		jQuery: 'jquery',
    		"window.jQuery": 'jquery',
    		jquery: 'jquery',
    		"window.jquery": 'jquery',
    		_: 'underscore',
    		Backbone: 'backbone'
	}),
	//new writeFilePlugin()
  ]
};
