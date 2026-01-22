
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { RequestController } from "../controllers/RequestController";
import { ActivityController } from "../controllers/ActivityController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";

export const router = Router();


router.post("/login", AuthController.login);


router.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ file: req.file?.filename });
});


router.post("/users", UserController.create);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.put("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, UserController.delete);


router.post("/requests", authMiddleware, RequestController.create);
router.get("/requests", RequestController.getAll);
router.get("/requests/:id", RequestController.getById);
router.put("/requests/:id", authMiddleware, RequestController.update);
router.delete("/requests/:id", authMiddleware, RequestController.delete);


router.post("/activities", authMiddleware, RequestController.create);
router.get("/activities", ActivityController.getAll);
router.get("/activities/:id", ActivityController.getById);
router.get("/activities/request/:requestId", ActivityController.getByRequestId);
router.put("/activities/:id", authMiddleware, ActivityController.update);
router.delete("/activities/:id", authMiddleware, ActivityController.delete);
