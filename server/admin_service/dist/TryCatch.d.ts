import type { NextFunction, Request, RequestHandler, Response } from "express";
declare const TryCatch: <T extends Request = Request>(handler: (req: T, res: Response, next: NextFunction) => Promise<any>) => RequestHandler;
export default TryCatch;
//# sourceMappingURL=TryCatch.d.ts.map