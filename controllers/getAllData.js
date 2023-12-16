const db = require("../models");

const Headlines = db.headlines;

const getAllData = async (req, res) => {
  console.log("---> GET ALL Request received");

  const password = req?.body?.password;

  if (!password) {
    res.status(400).send("Please include password");
  } else if (password !== process.env.AUTHORIZATION_PASSWORD) {
    res.status(400).send("Invalid password");
  } else {
    try {
      const data = await Headlines.findAll({ raw: true });
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
};

module.exports = getAllData;
