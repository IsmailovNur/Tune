import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}

run().catch(e => console.error(e));

