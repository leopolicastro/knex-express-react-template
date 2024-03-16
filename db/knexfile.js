module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "password",
      database: "models-demo",
      charset: "utf8",
    },
  },
  seeds: {
    directory: "./db/seeds",
  },
  migrations: {
    directory: "./db/migrations",
  },
};
