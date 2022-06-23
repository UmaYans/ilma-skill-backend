const { Router } = require("express");
const { serviceController } = require("../controllers/services.controller");

const router = Router();

router.post("/service", serviceController.addService)
router.get("/service", serviceController.getAllServices)
router.get("/service/:id", serviceController.getServiceById)
router.get("/service/tag", serviceController.getServiceByTag)
router.get("/service/content", serviceController.getServiceByAgeFromContent)

module.exports = router;