const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/CardsList.tsx',
  devServer: {
    port: 3003,
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
      name: 'cards_mf',
      filename: 'remoteEntry.js',
      exposes: {
        './CardsList': './src/CardsList',
      },
      shared: {
        react: { 
            singleton: true, 
            requiredVersion: '^18.2.0',
            eager: true
        },
      },
    }),
  ],
};