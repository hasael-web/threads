import { AppDataSource } from "./data-source";
import * as express from "express";
import RouterUser from "../src/route/UserRoute";
import RouterThread from "../src/route/ThreadRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    // Port
    const PORT = 3000;
    app.use(express.json());

    app.use("/api/v1", RouterUser);
    app.use("/api/v1", RouterThread);

    app.listen(PORT, () => {
      console.log(`port running ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
