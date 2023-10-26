import { AppDataSource } from "./data-source";
import * as express from "express";
import { LikeRouter, RepliceRote, ThreadRoute, UserRoute, FollowingRouter } from "./route";
import * as cookieParser from "cookie-parser";
// middleware
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    // Port
    const PORT = 3000;
    // cors option
    const API_URL = "http://localhost:5173/";
    const option: cors.CorsOptions = {
      allowedHeaders: ["X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],

      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    };
    // middleware
    app.use(cors(option));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api/v1", UserRoute);
    app.use("/api/v1", ThreadRoute);
    app.use("/api/v1", RepliceRote);
    app.use("/api/v1", LikeRouter);
    app.use("/api/v1", FollowingRouter);

    app.listen(PORT, () => {
      console.log(`port running ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
