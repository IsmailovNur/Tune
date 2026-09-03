import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from "mongoose";
import { IUser } from "../types";
import { User } from "../models/User";

export interface RequestWithUser extends Request {
  user?: HydratedDocument<IUser>;
};

export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json({error: "No token provided!"});
  }

  const user = await User.findOne({token});
  if (!user) {
    return res.status(401).json({error: "Unauthorized: Invalid token!"});
  }

  req.user = user;
  next();
};