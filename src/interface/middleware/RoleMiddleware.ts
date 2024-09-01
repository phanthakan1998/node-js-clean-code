import { Request, Response, NextFunction } from "express";
import { Role } from "../../domain/enums/role";
import { sendResponse } from "../../utils/common";

export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = (req as any).user.roles;
    if (!roles.some((role) => userRoles.includes(role))) {
      sendResponse(res, undefined, 403, "Forbidden: Insufficient role");
    }
    next();
  };
};
