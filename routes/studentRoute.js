module.exports = (app) => {
  const router = require("express").Router();
  const student = require("../controllers/studentController");

  router.get("/", student.getStudents);
  router
    .route("/:id")
    .get(student.getStudent)
    .put(student.updateStudent)
    .delete(student.deleteStudent);
  router.post("/login", student.login);
  router.post("/signup", student.signup);

  app.use("/api/students", router);
};
