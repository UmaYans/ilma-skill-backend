const express = require("express");
const { chatController } = require("../controllers/chat.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/chat", authMiddlewares, chatController.accessChat);
router.get("/chat", authMiddlewares, chatController.fetchChats);
router.post("/chat/group", authMiddlewares, chatController.createGroupChat);
router.put("/chat/rename", authMiddlewares, chatController.renameGroup);
router.put(
  "/chat/groupremove",
  authMiddlewares,
  chatController.removeFromGroup
);
router.put("/chat/groupadd", authMiddlewares, chatController.addToGroup);

module.exports = router;
