const { Router } = require("express");
const { CommentController } = require("../controllers/comments.controllers");
const router = Router();

router.post("/comment/:id", CommentController.postComments);
router.get("/servCom/:servId", CommentController.getComByService);
router.delete("/comment/:id", CommentController.deleteComments);


module.exports = router;
