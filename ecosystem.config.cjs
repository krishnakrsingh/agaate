module.exports = {
  apps: [
    {
      name: "agaate",
      script: ".output/server/index.mjs",
      cwd: "/www/wwwroot/agaate",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NITRO_PORT: 3000,
        NITRO_HOST: "127.0.0.1",
      },
    },
  ],
};
