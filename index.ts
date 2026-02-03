import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './app/routes.js';
import { errorMiddleware } from './app/common/middlewares/error.middleware.js';
import { connectDB } from './app/common/config/db.js';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', routes);
app.use(errorMiddleware);

const PORT: number = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server', error);
    process.exit(1);
  }
};

startServer();
