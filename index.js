require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3333;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const user = require("./controller/destinyController");

app.post("/pontos", user.createdDestiny);
app.get("/destiny", user.getDestiny)