import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import router from "./router";

const app = express();
app.use(
  cors({
    origin: [
      "https://tf3xr-miaaa-aaaal-qmtba-cai.icp0.io",
      "http://localhost:3000", 
    ],
    methods: ['GET', 'POST'],
    credentials: true, 
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const server = http.createServer(app);

server.listen({ port: PORT, host: HOST }, () => {
  console.log(`Server is running on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/api", router());
