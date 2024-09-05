## Build electron app 
```js
const nodeExternals = require("webpack-node-externals");

module.exports = {
  webpack: {
    style: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
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

```

## Build web app 
```js
const nodeExternals = require("webpack-node-externals");

module.exports = {
  webpack: {
    style: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
};

```