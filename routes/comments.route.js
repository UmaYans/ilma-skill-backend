const { Router } = require("express");
const { CommentController } = require("../controllers/comments.controllers");
const authMiddlewares = require("../controllers/middlewares/auth.middlewares");
const router = Router();

router.post("/comment/:id", authMiddlewares, CommentController.postComments);
router.get("/servCom/:servId", CommentController.getComByService);
router.get("/userCom", authMiddlewares, CommentController.getComUserId);
router.delete(
  "/comment/:id",
  authMiddlewares,
  CommentController.deleteComments
);

module.exports = router;
