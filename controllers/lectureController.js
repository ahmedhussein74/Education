const db = require("../models");
const Lecture = db.lectures;

// create lecture
exports.createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(200).json(lecture);
  } catch (err) {
    res.status(500).json({ message });
  }
};

// Get all lectures
exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.findAll();
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get lecture by ID
exports.getLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update lecture
exports.updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete lecture
exports.deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    await lecture.destroy();
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
