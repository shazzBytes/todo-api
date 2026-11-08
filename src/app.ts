import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.routes.ts"
import cookieParser from "cookie-parser"
function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser())
  app.use(authRouter);
  return app;
}

export default createApp;
