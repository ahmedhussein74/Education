module.exports = {
  HOST: "containers-us-west-38.railway.app",
  USER: "root",
  PASSWORD: "DkObSuAmdvYEPBssvZJf",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
