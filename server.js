const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;

app.listen(PORT, err => {
  if (err) throw err;

  console.log(`Server is running in port:${PORT}`);
});
