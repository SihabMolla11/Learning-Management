import express from "express";
import userRoutes from "./user.route";
import adminRoutes from "./admin.routes";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/admin-dashboard", adminRoutes);


export default router;
