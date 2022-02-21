module.exports = {
  apps: [
    {
      name: "bossnet-client",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
