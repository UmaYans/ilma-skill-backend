const { Router } = require("express");
const { categoryController } = require("../controllers/categories.controller");

const router = Router();

router.post("/category", CategoryController.postCategory);
router.get("/category", CategoryController.getCategory);
router.get("/category/:id", CategoryController.getCategoryById);

module.exports = router;