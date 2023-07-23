const db = require("../models");
const User = db.users;
const Lecture = db.lectures;
const Enrollment = db.enrollments;

// create new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message });
  }
};

// Get all users with their lectures
exports.getAllUsersWithLectures = async (req, res) => {
  try {
    const usersLectures = await User.findAll({
      include: [
        {
          model: "Lecture",
          attributes: ["title", "description", "imageCover", "url"],
          through: {
            attributes: ["userId", "lectureId"],
          },
        },
      ],
    });
    res.status(200).json(usersLectures);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all user lectures
exports.getAllUserLectures = async (req, res) => {
  try {
    const { id } = req.params;
    const userLectures = await User.findByPk(id, {
      include: [
        {
          model: "Lecture",
          attributes: ["title", "description", "imageCover", "url"],
          through: {
            attributes: ["userId", "lectureId"],
          },
        },
      ],
    });
    res.status(200).json(userLectures);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all lecture users
exports.getAllLectureUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const lectureUsers = await Lecture.findByPk(id, {
      include: [
        {
          model: "User",
          attributes: ["name", "email"],
          through: {
            attributes: ["lectureId", "userId"],
          },
        },
      ],
    });
    res.status(200).json(lectureUsers);
  } catch (error) {
    res.status(500).json({ error });
  }
};
