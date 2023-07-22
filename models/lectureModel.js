module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    "lecture",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageCover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Lectures",
      timestamps: true,
    }
  );

  return Lecture;
};
