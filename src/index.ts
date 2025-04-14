import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import router from "./router";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "https://55e7x-xyaaa-aaaal-qmzsq-cai.icp0.io",
      "http://localhost:3000",
      "http://localhost:3001",
      `http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943`,
      "https://68dc-197-239-10-208.ngrok-free.app"
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes BEFORE starting server
app.use("/api", router());

const PORT = process.env.PORT || 5012;
const HOST = "0.0.0.0";

const server = http.createServer(app);

server.listen({ port: PORT, host: HOST }, () => {
  console.log(`Server is running on port ${PORT}`);
});
