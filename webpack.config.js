const path = require('path');
// const webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: {
    app: ['./src/index.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: '#source-map',
  performance: { hints: false },
  // plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /node_modules\/[a-zA-Z0-9-_/.]+\.css$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].[ext]'
            }
          }
        ]
      },

      {
        test: /\.css$/, // https://javascriptplayground.com/css-modules-webpack-react/
        exclude: /node_modules/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader',
        options: {
          modules: true
        }
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
