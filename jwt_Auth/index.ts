import './app/common/config/env';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './app/routes.js';
import { connectDB } from './app/common/config/db.js';
import { errorMiddleware } from './app/common/middlewares/error.middleware.js';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', routes);
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
