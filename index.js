const dotenv = require("dotenv").config();
const express = require("express");

const headlineRoutes = require("./routes/headlineRoutes");
const db = require("./models");

const PORT = process.env.PORT || 8080;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("db has been re sync");
// });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static("pages"));

app.use("/api/v1", headlineRoutes);

app.listen(PORT, () => console.log(`---> Server is connected on ${PORT} <---`));
