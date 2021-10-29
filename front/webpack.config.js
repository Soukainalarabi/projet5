const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    script: "./js/script.js",
    cart: "./js/cart.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

/** 
module.exports = {
  mode: "production",
  entry: ["./js/script.js", "./js/cart.js"],
  output: {
    filename: "all.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};*/
