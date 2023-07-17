const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("student", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      minLength: 8,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Student.beforeCreate(async (student) => {
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  });

  Student.beforeUpdate(async (student) => {
    if (student.changed("password")) {
      const hashedPassword = await bcrypt.hash(student.password, 10);
      student.password = hashedPassword;
    }
  });

  Student.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Student;
};
