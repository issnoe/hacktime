const nodeExternals = require("webpack-node-externals");

module.exports = {
  webpack: {
    // only web
    // style: {
    //   postcss: {
    //     plugins: [require("tailwindcss"), require("autoprefixer")],
    //   },
    // },

    // Only electron
    configure: {
      target: "electron-renderer",
      externals: [
        nodeExternals({
          allowlist: [/webpack(\/.*)?/, "electron-devtools-installer"],
        }),
      ],
    },
  },
};