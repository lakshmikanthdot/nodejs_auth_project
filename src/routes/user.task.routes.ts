import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

export const userTaskRouter = Router();

// all routes are protected by the authenticate middleware
// because we want to make sure that only authenticated users can access these routes
// logged in users only create, read, update and delete their own tasks (CRUD operations)
// if we use the authenticate middleware here, it will be applied to all the routes defined in this router
// it is a good practice to use the authenticate middleware at the router level, so that we don't have to apply it to each route individually
userTaskRouter.use(authenticate);

// all the routes below are protected by the authenticate middleware
