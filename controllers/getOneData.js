const db = require("../models");

const Headlines = db.headlines;

const getOneData = async (req, res) => {
  console.log("---> GET ONE Request received");

  const link = req?.body?.link;
  if (!link) {
    res.status(400).send("Please include link in body");
  }

  try {
    const data = await Headlines.findOne({
      where: {
        link: link,
      },
    });

    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(200)
        .send({
          link: link,
          headline: "Not available",
          bias: "Not available",
          rhyme: "Not available",
        });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = getOneData;
