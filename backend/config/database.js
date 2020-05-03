module.exports = {
  username: process.env.ENV_DB_USER,
  password: process.env.ENV_DB_PASS,
  database: process.env.ENV_DB_NAME,
  host: process.env.ENV_DB_HOST,
  port: process.env.ENV_DB_PORT,
  dialect: process.env.ENV_DB_DIALECT,
}