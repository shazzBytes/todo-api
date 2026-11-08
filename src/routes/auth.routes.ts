import { Router, type NextFunction } from "express";
import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import User from "../models/User.model.ts";
import {createToken} from "../utils/token.ts"
const router = Router();
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "please enter name",
        });
      }
      if (!email) {
        return res.status(400).json({
          message: "please enter email",
        });
      }
      if (!password) {
        return res.status(400).json({
          message: "Please enter password",
        });
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          message: "User exists, please log in",
        });
      }
      console.log(userExists);
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = {
        name,
        email,
        password: hashedPassword,
      };
      await User.insertOne(user);
      return res.status(200).json({
        name,
        email,
        hashedPassword,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({
          message: "Email required",
        });
      }
      if (!password) {
        if (!password) {
          return res.status(400).json({
            message: "Password required",
          });
        }
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "User not found. Please register",
        });
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password,
      );
      // The case where you get logged in successfully
      if (isPasswordCorrect) {
        res.status(200).json({
          message: "Logged in successfully",
        });
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    } catch (error) {
      next(error);
    }
  },
);
router.get('/me', async (req: Request, res:Response, next:NextFunction) => {
  try {

  } catch(error) {
    next(error);
  }
})
export default router;
