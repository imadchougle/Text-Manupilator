const webpack = require('webpack');

module.exports = {
  // Other webpack configurations...

  resolve: {
    fallback: {
      url: require.resolve('url/'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
