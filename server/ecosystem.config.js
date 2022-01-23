module.exports = {
  apps: [
    {
      name: "bossnet-api",
      script: "./src/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        SECRET_COOKIE_CODE: "h$gjs$=df$v*kjh-è_-è_è-khsfdfg*jdlfz1289",
        SECRET_JWT_CODE: "h$gjs$=df$v*kjh-è_-è_è-khsfdg*jdlf1243",
      },
      env_production: {
        NODE_ENV: "production",
        SECRET_COOKIE_CODE: "h$gjs$=df$v*kjh-è_-è_è-khsfdfg*jdlfz1289",
        SECRET_JWT_CODE: "h$gjs$=df$v*kjh-è_-è_è-khsfdg*jdlf1243",
      },
    },
    // {
    //   name: "bossnet-client",
    //   script: "./client/node_modules/nuxt/bin/nuxt.js",
    //   args: "dev",
    //   env: {
    //     NODE_ENV: "development",
    //   },
    //   env_production: {
    //     NODE_ENV: "production",
    //   },
    // },
  ],

  // deploy: {
  //   production: {
  //     user: "SSH_USERNAME",
  //     host: "SSH_HOSTMACHINE",
  //     ref: "origin/master",
  //     repo: "GIT_REPOSITORY",
  //     path: "DESTINATION_PATH",
  //     "pre-deploy-local": "",
  //     "post-deploy":
  //       "npm install && pm2 reload ecosystem.config.js --env production",
  //     "pre-setup": "",
  //   },
  // },
};
