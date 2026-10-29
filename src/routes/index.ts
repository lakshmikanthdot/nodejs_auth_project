// combine all your routes of application
// 1000
// plugging all routes in one place

import { Router } from "express";
import { healthRouter } from "./health.routes";
import { authRouter } from "./auth.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);

// "/auth" is the parent route for all the authentication routes
// like "/auth/login", "/auth/register", "/auth/forgot-password", etc.
apiRouter.use("/auth", authRouter);
