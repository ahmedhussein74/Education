module.exports = (app) => {
  const router = require("express").Router();
  const user = require("../controllers/userController");

  router.get("/", user.getUsers);
  router
    .route("/:id")
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);
  router.post("/login", user.login);
  router.post("/signup", user.signup);

  app.use("/api/users", router);
};
