module.exports = {
  apps: [
    {
      name: "bossnet-client",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
