const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'shared-components': path.resolve(__dirname, '../shared-components/dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      remotes: {
        source_mf: 'source_mf@http://localhost:3001/remoteEntry.js',
        theme_mf: 'theme_mf@http://localhost:3002/remoteEntry.js',
        cards_mf: 'cards_mf@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: { 
            singleton: true, 
            requiredVersion: '^18.2.0',
            eager: true
        },
        'react-dom': { 
            singleton: true,
            requiredVersion: '^18.2.0',
            eager: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};