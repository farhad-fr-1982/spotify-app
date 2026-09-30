import type { NextFunction, Request, Response } from "express";
import { type IUser } from "./model.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
declare const isAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export default isAuth;
//# sourceMappingURL=middleware%20.d.ts.map