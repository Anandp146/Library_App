import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";

const PORT = config.server.port;

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("Connection to mongoDB successfully made");

    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("could not made a connection to the databse");
  }
})();
