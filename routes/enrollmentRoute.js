module.exports = (app) => {
  const router = require("express").Router();
  const enrollment = require("../controllers/enrollmentController");

  router.post("/createenrollment", enrollment.createEnrollment);
  router.get("/", enrollment.getAllUsersWithLectures);
  router.get("/userlectures", enrollment.getAllUserLectures);
  router.get("/lectureusers", enrollment.getAllLectureUsers);
  
  app.use("/api/enrollments", router);
};
