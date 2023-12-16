const express = require("express");

const getOneData = require("../controllers/getOneData");
const getAllData = require("../controllers/getAllData");
const postData = require("../controllers/postData");

const router = express.Router();

// home
router.get("/", async (req, res) => {
  res.status(200).send("Welcome to smart headlines API");
});

// getOneData
router.post("/getOneData", getOneData);

// getAllData
router.post("/getAllData", getAllData);

// postData
router.post("/postData", postData);

module.exports = router;
