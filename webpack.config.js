const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '/public/index.html'),
      inject: 'body'
    })
  ],
}