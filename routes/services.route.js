const { Router } = require("express");
const authMiddlewares = require("../controllers/middlewares/auth.middlewares");
const { serviceController } = require("../controllers/services.controller");
const fileMiddleware = require("../controllers/middlewares/file.middlewares");

const router = Router();

router.post("/service",fileMiddleware.single("image"), authMiddlewares, serviceController.addService);

router.get("/service", serviceController.getAllServices);

router.get("/service/one/:id", serviceController.getServiceById);

router.get("/service/tags", serviceController.getServiceByTag);

router.get(
  "/service/content/from12",
  serviceController.getServiceByAgeFromContent
);

router.get("/service/format", serviceController.getServiceByFormat);

router.post("/service/one/course/entry", serviceController.getServiceByFormat);

// router.post("/service/rating/for", serviceController.serviceEntry)

router.post(
  "/service/entry/course/:id/wou",
  authMiddlewares,
  serviceController.entryCourse
);

router.patch("/saveCourses/:id", authMiddlewares, serviceController.saveCorses);
router.patch(
  "/deleteCourses/:id",
  authMiddlewares,
  serviceController.deleteSaveCourse
);
router.get(
  "/teacherService",
  authMiddlewares,
  serviceController.getServiceTeacher
);


module.exports = router;
