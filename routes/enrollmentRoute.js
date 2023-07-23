module.exports = (app) => {
  const router = require("express").Router();
  const enrollment = require("../controllers/enrollmentController");

  router.post("/createenrollment", enrollment.createEnrollment);
  router.get("/", enrollment.getAllUsersWithLectures);
  router.get("/userlectures/:id", enrollment.getAllUserLectures);
  router.get("/lectureusers/:id", enrollment.getAllLectureUsers);
  
  app.use("/api/enrollments", router);
};
