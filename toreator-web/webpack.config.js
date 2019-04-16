require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require("postcss-preset-env");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {
  // Feature blocks
  createConfig,
  match,
  babel,
  devServer,
  uglify,
    css,
  sass,
  postcss,
  // Shorthand setters
  customConfig,
  setEnv,
  entryPoint,
  env,
  url,
  setOutput,
  resolve,
  addPlugins,
  sourceMaps,
  performance
} = require("webpack-blocks");

const preset = {
  cssModules: {
    localIdentName: "[name]__[local]___[hash:base64:5]",
  },
  postcss: {
    ident: "postcss",
    plugins: () => [
      require("postcss-import")(),
      postcssPresetEnv({
        browsers: [
          ">1%",
          "last 4 versions",
          "Firefox ESR",
          "not ie < 10",
        ],
      }),
    ],
  },
};

module.exports = createConfig([
  entryPoint({
    app: "./src/index.tsx"
  }),
  setEnv({
    NODE_ENV: process.env.NODE_ENV
  }),
  match(
      ["*.gif", "*.jpg", "*.jpeg", "*.png", "*.svg", "*.webp"],
      [url({limit: 30000})]
  ),
  resolve({
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }),
  match(["*.tsx", ".js", ".jsx", ".ts", "!*node_modules*"], [babel()]),
  match(
      ["*.scss", "!*node_modules*"],
      [css.modules(preset.cssModules), postcss(preset.postcss), sass({minimize: true})],
  ),
  addPlugins([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      Promise: "es6-promise-promise",
    }),
  ]),
  env("development", [
    setOutput({
      filename: "main.js",
      path: path.join(__dirname, "build/dev"),
      publicPath: "/build/dev"
    }),
    sourceMaps(),
    devServer({
      contentBase: path.resolve(__dirname, "build/dev/"),
      overlay: true,
      compress: true,
      port: 3000,
      historyApiFallback: {
        disableDotRule: true
      }
    }),
    addPlugins([
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "public", "/template.html"),
      }),
      new CopyWebpackPlugin([
        {from: 'public/assets/', to: 'assets/'},
      ]),
    ]),

  ]),
  env("production", [
    setOutput({
      chunkFilename: "[name].[chunkhash:8].js",
      filename: "[name].[chunkhash:8].js",
      path: path.resolve(__dirname, "build/prod"),
      publicPath: "/"
    }),
    uglify({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }
    }),
    performance({
      hints: false
    }),
    addPlugins([
      new CleanWebpackPlugin('build'),
      new webpack.LoaderOptionsPlugin({minimize: true, debug: false, quite: true}),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "public", "/template.html"),
      }),
      new CopyWebpackPlugin([
        {from: 'public/assets/', to: 'assets/'},
      ]),
      new SWPrecacheWebpackPlugin({
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: "service-worker.js",
        minify: false,
        navigateFallback: "/index.html",
        staticFileGlobsIgnorePatterns: [/\.map$/, /assets\/manifest\.json$/],
      }),
      // new BundleAnalyzerPlugin()
    ]),
    customConfig({
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-intl|react-dom|intl|react-router-dom|shared)[\\/]/,
              minChunks: Infinity,
            },
          },
        },
      },
    }),
    customConfig({
      stats: {
        // Add asset Information
        assets: true,
        // Sort assets by a field
        // You can reverse the sort with `!field`.
        assetsSort: "!size",
        // Show cached assets (setting this to `false` only shows emitted files)
        cachedAssets: true,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: true,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: true,
        // You can reverse the sort with `!field`. Default is `id`.
        chunksSort: "!size",
        // Add the hash of the compilation
        hash: true,
        // Set the maximum number of modules to be shown
        maxModules: 15,
        // Add built modules information
        modules: true,
        modulesSort: "!size"
      }
    }),
  ])
]);
