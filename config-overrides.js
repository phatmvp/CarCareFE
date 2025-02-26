const { override, addWebpackResolve } = require("customize-cra");

module.exports = override(
  addWebpackResolve({
    fallback: {
      crypto: false, // Bỏ qua crypto
    },
  })
);
