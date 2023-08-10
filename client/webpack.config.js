const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest'); 
const path = require('path'); 
const { InjectManifest } = require('workbox-webpack-plugin'); 

// Exporting a webpack configuration object
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js', 
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Adding webpack plugins to the configuration
      new InjectManifest({
        swSrc: './src-sw.js', // Service worker source file
        swDest: './src-sw.js', // Service worker destination
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        // all for the PWA manifest
        name: 'PWA Text Editor',
        short_name: 'JATE',
        description: 'Edit text by using PWA', 
        start_url: './',
        publicPath: './',
        background_color: '#31a9e1', // Background color for the PWA
        theme_color: '#31a9e1', // Theme color for the PWA
        icons: [
          {
            src: path.resolve('src/images/logo.png'), 
            destination: path.join('assets', 'icons'), 
            sizes: [96, 128],
             // Icon sizes
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './index.html', 
        // HTML template file to use
        title: 'J.A.T.E.', 
        // Title for the generated HTML file
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css/, // Test for CSS files
          use: ['style-loader', 'css-loader'], // Using style-loader and css-loader for processing CSS
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/, 
          // Exclude node_modules from processing
          use: {
            loader: 'babel-loader', // Using Babel loader to transpile ES6 code
            options: {
              presets: ['@babel/preset-env'], // Babel presets for ES6+ compatibility
              plugins: ['@babel/transform-runtime','@babel/plugin-proposal-object-rest-spread'], // Babel plugins for additional features
            },
          },
        },
      ],
    },
  };
};