const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const authMiddlewares = require("../middlewares/auth.middlewares");
const fileMiddleware = require("../middlewares/file.middlewares");
// const { check } = require("express-validator");
const router = Router();

router.post(
  "/users",
  // [
  //   check("firstName", "Это поле не должно быть пустым").notEmpty(),
  //   check("lastName", "Это поле не должно быть пустым").notEmpty(),
  //   check("login", "Это поле не должно быть пустым").notEmpty(),
  //   check("login", "Некорректный email").isEmail(),
  //   check("password", "Это поле не должно быть пустым").notEmpty(),
  //   check("phone", "Поле не может быть пустым").notEmpty(),
  //   check(
  //     "password",
  //     "Пароль должен быть больше 4 и меньше 12 символов"
  //   ).isLength({
  //     min: 5,
  //     max: 12,
  //   }),
  // ],
  usersController.registerUser
);
router.post(
  "/login",
  // [
  //   check("login", "Это поле не должно быть пустым").notEmpty(),
  //   check("login", "Некорректный email").isEmail(),
  //   check("password", "Это поле не должно быть пустым").notEmpty(),
  // ],
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
