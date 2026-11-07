import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createuserTask,
  getUserTaskById,
  getUserTasks,
} from "../services/user.task.service";

export const userTaskRouter = Router();

// all routes are protected by the authenticate middleware
// because we want to make sure that only authenticated users can access these routes
// logged in users only create, read, update and delete their own tasks (CRUD operations)
// if we use the authenticate middleware here, it will be applied to all the routes defined in this router
// it is a good practice to use the authenticate middleware at the router level, so that we don't have to apply it to each route individually
userTaskRouter.use(authenticate);

// all the routes below are protected by the authenticate middleware
// create the task for the logged in user
userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await createuserTask(req.user!.userId, req.body.title);
    res.status(201).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

// fetch all the tasks for the logged in user
userTaskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user!.userId);
    res.status(200).json({
      success: true,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
});

// fetch single task
// using the dynamic api route parameter ":taskId" to fetch a single task by its ID
// we get that taskId from the req.params object,
// which is an object that contains all the route parameters defined in the route path
userTaskRouter.get("/:taskId", async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await getUserTaskById(req.user!.userId, taskId);
    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});
