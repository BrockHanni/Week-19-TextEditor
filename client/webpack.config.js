const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

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
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Edit text by using PWA',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            destination: path.join('assets', 'icons'),
            sizes: [96, 128],
          },
        ],
      }),
    ],
    module: {
      rules: [
      {
        // tests for js, not including node_modules
        test: /\.m?js$/,
        exclude: /node_modules/,
        // We use babel-loader in order to use ES6.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
  };
};
