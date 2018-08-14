const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'bundles/js'),
    filename: 'index.js'
  },
  mode: process.env.NODE_MODE || 'development'
};