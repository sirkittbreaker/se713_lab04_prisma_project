import express from "express";
import authorRoute from "./routes/authorRoute";
import memberRoute from "./routes/memberRoute";
import bookRoute from "./routes/bookRoute";
import borrowingRoute from "./routes/borrowingRoute";

const app = express();
app.use(express.json());
app.use("/authors", authorRoute);
app.use("/members", memberRoute);
app.use("/books", bookRoute);
app.use("/borrowing", borrowingRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
