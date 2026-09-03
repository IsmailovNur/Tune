import { NextFunction, Response } from 'express';
import { RequestWithUser, Role } from "../types";

export const permit = (...roles: Role[]) => {
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