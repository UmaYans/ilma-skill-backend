const { Router } = require("express");

const router = Router();

router.use(require("./categories.route.js"));
router.use(require("./comments.route.js"));
router.use(require("./services.route.js"));
router.use(require("./users.route.js"));


module.exports = router;