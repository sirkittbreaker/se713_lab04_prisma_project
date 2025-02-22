import express, { Request, Response } from "express";
import authorRoute from "./routes/authorRoute";

const app = express();
app.use(express.json());
app.use("/authors", authorRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
