const db = require("../models");
const Student = db.students;
const jwt = require("jsonwebtoken");

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get student by ID
exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await student.update(req.body, { validateBeforeSave: false });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await student.destroy();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    const isValidPassword = await student.isValidPassword(password);
    if (!student || !isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: student.id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Signup
exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    if (student) {
      return res.status(400).json({ message: "email already exist" });
    }
    const newStudent = await Student.create(req.body);
    const token = jwt.sign({ id: newStudent.id }, "secret", {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Student created", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
