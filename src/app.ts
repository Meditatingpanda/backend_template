import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import colors from "colors";
import fs from "fs";
import https from "https";
import path from "path";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 3000;
const credentials = {
  key: fs.readFileSync(path.join(__dirname, "./certificates/key.pem"), "utf8"),
  cert: fs.readFileSync(path.join(__dirname, "./certificates/cert.pem"), "utf8"),
};
const server = https.createServer(credentials, app);
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(colors.yellow(`Server running on port ${port}`));
});
// app.listen(port, () => {
//   console.log(colors.yellow(`Server running on port ${port}`));
// });
