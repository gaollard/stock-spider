const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src//assets/style/vars.less")]
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      "/api": {
        target: "http://localhost:3010",
        pathRewrite: {
          "^/api/": "/"
        },
        changeOrigin: true
      }
    }
  }
};
