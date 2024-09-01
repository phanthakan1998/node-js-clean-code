import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { register, login } from "../controllers/AuthController";
import { authenticateJWT } from "../middleware/AuthMiddleware";
import { authorize } from "../middleware/RoleMiddleware";
import { apiKeyMiddleware } from "../middleware/ApiKey";
import { Role } from "../../domain/enums/role";

const router = Router();

router.use(apiKeyMiddleware);

router.post("/createUser", UserController.create);
router.post("/register", register);
router.post("/login", login);

router.get("/protected-route", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route" });
});

router.get(
  "/admin-only",
  authenticateJWT,
  authorize([Role.Admin]),
  (req, res) => {
    res.json({ message: "This is an admin-only route" });
  }
);

export default router;
