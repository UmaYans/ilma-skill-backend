const { Router } = require("express");
const { categoryController } = require("../controllers/categories.controller");

const router = Router();

router.post("/category", categoryController.postCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:id", categoryController.getCategoryById);

module.exports = router;