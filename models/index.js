const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    storage: process.env.DB_URL,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`---> Database connected <---`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.headlines = require("./headlines")(sequelize, DataTypes);

module.exports = db;
