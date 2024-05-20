module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/src"),
  },
  resolve: {
    extensions: [".ts", ".js", ".mjs"],
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
};
