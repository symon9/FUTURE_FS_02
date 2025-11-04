import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { AppError } from "../utils/AppError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(
        new AppError(400, "Please provide name, email, and password.")
      );
    }

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return next(new AppError(409, "User with this email already exists."));
    }

    const user = await authService.registerUser({ name, email, password });
    const token = authService.generateToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(400, "Please provide email and password."));
    }

    const user = await authService.findUserByEmail(email);
    if (
      !user ||
      !(await authService.validatePassword(password, user.passwordHash))
    ) {
      return next(new AppError(401, "Incorrect email or password."));
    }

    const token = authService.generateToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
