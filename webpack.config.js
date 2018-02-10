'use strict';
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve("./src/js/index.js")
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve("./build/js")
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
  }
};