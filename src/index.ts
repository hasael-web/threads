import { AppDataSource } from "./data-source";
import * as express from "express";
import { LikeRouter, RepliceRote, ThreadRoute, UserRoute, FollowingRouter } from "./route";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    // Port
    const PORT = 3000;
    app.use(express.json());

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
