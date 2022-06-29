const { Router } = require("express");
const { serviceController } = require("../controllers/services.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/service",authMiddlewares, serviceController.addService);

router.get("/service", serviceController.getAllServices);

router.get("/service/one/:id", serviceController.getServiceById);

router.get("/service/tags", serviceController.getServiceByTag);

router.get("/service/content/from12", serviceController.getServiceByAgeFromContent);

router.get("/service/format", serviceController.getServiceByFormat);

router.post("/service/one/course/entry", serviceController.getServiceByFormat);

// router.post("/service/rating/for", serviceController.serviceEntry)

router.post("/service/entry/course/:id/wou", authMiddlewares, serviceController.entryCourse)



module.exports = router;