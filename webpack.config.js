'use strict';
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    main: path.resolve("./src/js/index.js")
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve("./build/js")
  },
  resolve: {
    alias: {
      "three/STLLoader": path.join(
        __dirname,
        "node_modules/three/examples/js/loaders/STLLoader.js"
      ),
      "three/OrbitControls": path.join(
        __dirname,
        "node_modules/three/examples/js/controls/OrbitControls.js"
      )
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              "syntax-object-rest-spread",
              "transform-object-rest-spread"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      THREE: "three"
    })
  ]
};