const express = require("express"),
  app = express();
require("dotenv").config();
const APP_URL = process.env.APP_URL,
  APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
//   console.clear();
  console.log(`Server is running..!`);
  console.log(`http://${APP_URL}:${APP_PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile("./views/home.html",{root:__dirname});
});
