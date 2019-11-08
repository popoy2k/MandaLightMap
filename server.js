const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const Helper = require("./utility/Helper");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

// Things todo Asynchronously
Helper.isDir(path.join(__dirname, "storage"), function(isValid) {
  console.log(!isValid ? isValid : "");
});

// Middleware
require("./middleware/auth");
require("./middleware/map");

// Utility
require("./utility/Mailer");

// Routes
app.use("/auth", require("./route/main"));
app.use("/data", require("./route/data"));
app.use("/map", require("./route/map"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, err => {
  if (err) throw err;

  console.log(`Server is running in port:${PORT}`);
});
