
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { RequestController } from "../controllers/RequestController";
import { ActivityController } from "../controllers/ActivityController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";

export const router = Router();

// Auth Routes
router.post("/login", AuthController.login);

// Upload Route
router.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({ file: req.file?.filename });
});

// User Routes
router.post("/users", UserController.create);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.put("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, UserController.delete);

// Request Routes
router.post("/requests", authMiddleware, RequestController.create);
router.get("/requests", RequestController.getAll);
router.get("/requests/:id", RequestController.getById);
router.get("/requests/elderly/:elderlyId", RequestController.getByElderlyId);
router.put("/requests/:id", authMiddleware, RequestController.update);
router.delete("/requests/:id", authMiddleware, RequestController.delete);

// Activity Routes
router.post("/activities", authMiddleware, RequestController.create);
router.get("/activities", ActivityController.getAll);
router.get("/activities/:id", ActivityController.getById);
router.get("/activities/request/:requestId", ActivityController.getByRequestId);
router.put("/activities/:id", authMiddleware, ActivityController.update);
router.delete("/activities/:id", authMiddleware, ActivityController.delete);
