// admin routes for task management
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import { getAdminTasks } from "../services/admin.user.service";

export const adminTaskRouter = Router();

// protected by the authenticate middleware
// we need to check the user is logged in or not and
// check the user is admin or not
// 2level of check
adminTaskRouter.use(authenticate, requireAdmin);

// get the tasks of all users
adminTaskRouter.get("/", async (req, res, next) => {
  try {
    const data = await getAdminTasks(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});
