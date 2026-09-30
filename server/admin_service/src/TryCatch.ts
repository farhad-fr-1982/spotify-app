import type { NextFunction, Request, RequestHandler, Response } from "express";

// TryCatch به صورت جنریک
const TryCatch = <T extends Request = Request>(
    handler: (req: T, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req as T, res, next);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";
            res.status(500).json({ message });
        }
    };
};

export default TryCatch;