module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define(
    "enrollment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      lectureId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Lectures",
          key: "id",
        },
      },
    },
    {
      tableName: "Enrollment",
      timestamps: true,
    }
  );

  return Enrollment;
};
