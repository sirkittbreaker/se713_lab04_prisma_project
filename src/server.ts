import express, { Request, Response } from "express";
import authorRoute from "./routes/authorRoute";
import memberRoute from "./routes/memberRoute";

const app = express();
app.use(express.json());
app.use("/authors", authorRoute);
app.use("/members", memberRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
