const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const authMiddlewares = require("../models/middlewares/auth.middlewares");

const router = Router();

router.post("/users", usersController.registerUser);
router.post("/login", usersController.login);
router.get("/user", authMiddlewares, usersController.getUserById);
// router.post("/users", usersController.registerUser);
// router.post("/login", usersController.login);
// router.get("/user", authMiddlewares, usersController.getUserById);
// для вывода профиля пользователя по айди из токена 🔼

module.exports = router;
