import { NextFunction, Response } from 'express';
import { RequestWithUser } from "./auth";

export const permit = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthenticated'});
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({error: "Not permissions!"});
    }
    next();
  }
}