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
const key=fs.readFileSync(path.join(__dirname, "./certificates/selfsigned.key"), "utf8");
const cert=fs.readFileSync(path.join(__dirname, "./certificates/selfsigned.crt"), "utf8");
const credentials = {
  key: key,
  cert: cert,
};
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(colors.bgCyan(`Server running on port ${port}`));
});
// app.listen(port, () => {
//   console.log(colors.bgCyan(`Server running on port ${port}`));
// });

