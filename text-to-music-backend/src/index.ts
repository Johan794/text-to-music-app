import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in context path /api/v1`);
});
