const express = require("express"),
  mongoose = require("mongoose"),
  path = require("path"),
  User = require(path.join(__dirname, "models", "userSchema.js")),
  app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

const APP_URL = process.env.APP_URL || "localhost",
  APP_PORT = process.env.APP_PORT || 3000,
  DB_PASSWORD = process.env.DB_PASSWORD,
  DB_USERNAME = process.env.DB_USERNAME,
  DB_NAME = process.env.DB_NAME,
  mongoURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ygya0jz.mongodb.net/${DB_NAME}?appName=Cluster0`;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "home.html"));
    });

    app.get("/form", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "form.html"));
    });

    app.post("/post-username", (req, res) => {
      console.log(req.body);
      const user = new User(req.body);
      user
        .save()
        .then(() => {
          console.log(`User saved`);
          res.redirect("/" /*http://localhost:3000/form*/);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    app.listen(APP_PORT, () => {
      console.log(`Server is running..!`);
      console.log(`http://${APP_URL}:${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
