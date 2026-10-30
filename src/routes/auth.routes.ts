import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service";

// using the express router to create a new router instance
export const authRouter = Router();

// register routes

// singup route
authRouter.post("/register", async (req, res, next) => {
  try {
    // when user is sending the email and password in the request body,
    // we will get the values from the frontend and send it to the backend
    // we will get it from req.body
    const { email, password } = req.body;

    // not writing the service logic here
    // we will call the service function to handle the registration logic
    await registerUser(email, password);

    // once the user is registered successfully
    // we will send the response back to the frontend
    // 201 status code means created
    res.status(201).json({
      success: true,
      message: " Registration successfull, Please login to continue",
    });
  } catch (error) {
    // pass the error to the error handler middleware
    // Error middlewares have 4 parameters: (err, req, res, next)
    next(error);
  }
});

// login route
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // when user is log in we are have to store some information
    // he is logged in or not (validtae his authentication)
    // we saved in the access token
    const { accessToken } = await loginUser(email, password);
    res.status(200).json({
      success: true,
      data: accessToken,
    });
  } catch (error) {
    next(error);
  }
});
