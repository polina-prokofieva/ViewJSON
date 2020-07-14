const path = require("path");

module.exports = {
  entry: {
    viewjson: "./src/ViewJSON.js",
  },
  mode: "development",
  output: {
    libraryTarget: "window",
    library: "ViewJSON",
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/i,
  //       use: ["style-loader", "less-loader", "css-loader"],
  //     },
  //   ],
  // },
};
