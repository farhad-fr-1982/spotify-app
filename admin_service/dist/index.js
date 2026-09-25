import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 7000;
const startServer = async () => {
    console.log(`Server is running on port ${port}`);
    app.listen(port, () => {
        console.log(`✅ Server started on http://localhost:${port}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map