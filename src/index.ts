import express from "express";
import {config} from "dotenv";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});
