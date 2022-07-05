const { Router } = require("express");

const router = Router();

router.use(require("./categories.route.js"));
router.use(require("./services.route.js"));
router.use(require("./comments.route.js"));
router.use(require("./message.route"));
router.use(require("./users.route"));
router.use(require("./chat.route"));

module.exports = router;
