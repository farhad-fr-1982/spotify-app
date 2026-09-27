// TryCatch به صورت جنریک
const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            res.status(500).json({ message });
        }
    };
};
export default TryCatch;
//# sourceMappingURL=TryCatch.js.map