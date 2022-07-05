const { Router } = require("express");
const authMiddlewares = require("../middlewares/auth.middlewares");
const { messageController } = require("../controllers/message.controller");

const router = Router();

router.post("/message", authMiddlewares, messageController.sendMessage);
router.get("/message/:chatId", authMiddlewares, messageController.allMessages);

module.exports = router;
