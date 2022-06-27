const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const authMiddlewares = require("../middlewares/auth.middlewares");
const fileMiddleware = require("../middlewares/file.middlewares");
const router = Router();

router.post("/users", usersController.registerUser);
router.post(
  "/login",

  usersController.login
);
router.get("/user", authMiddlewares, usersController.getUserById);
router.get("/users", usersController.getUsers);
router.patch(
  "/avatar/:id",
  fileMiddleware.single("avatar"),
  usersController.pathAvatar
);
// router.post("/users", usersController.registerUser);
// router.post("/login", usersController.login);
// router.get("/user", authMiddlewares, usersController.getUserById);
// для вывода профиля пользователя по айди из токена 🔼

module.exports = router;
