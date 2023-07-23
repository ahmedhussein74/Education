const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.lectures = require("./lectureModel")(sequelize, DataTypes);
db.enrollments = require("./enrollmentModel")(sequelize, DataTypes);

db.users.belongsToMany(db.lectures, {
  through: "Enrollment",
  as: "lectures",
  foreignKey: "userId",
});

db.lectures.belongsToMany(db.users, {
  through: "Enrollment",
  as: "users",
  foreignKey: "lectureId",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
