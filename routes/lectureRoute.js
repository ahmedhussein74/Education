module.exports = (app) => {
  const router = require("express").Router();
  const lecture = require("../controllers/lectureController");

  router.get("/", lecture.getLectures);
  router.post("/", lecture.createLecture);
  router
    .route("/:id")
    .get(lecture.getLecture)
    .put(lecture.updateLecture)
    .delete(lecture.deleteLecture);

  app.use("/api/lectures", router);
};
