const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Keysets Demo',
        template: './src/index.html',
        inject: true,
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),
  parts.loadTypeScript({ include: PATHS.app }),
  { externals: { ZoomdataSDK: "ZoomdataSDK" } },
]);

const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new BundleAnalyzerPlugin(),
    ],
    recordsPath: 'records.json',
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
      },
    },
  }),
  parts.attachRevision(),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(
  //     path.join(PATHS.app, '**', '*'),
  //     { nodir: true }
  //   ),
  // }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = function(env) {
  process.env.BABEL_ENV = env;
  const config = {
    entry: {
      app: env === 'production' ?
        PATHS.app :
        ['react-hot-loader/patch', PATHS.app]
    }
  };
  if (env === 'production') {
    return merge(config, commonConfig, productionConfig);
  }

  return merge(config, commonConfig, developmentConfig);
};
