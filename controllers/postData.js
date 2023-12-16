const OpenAI = require("openai");

const db = require("../models");

const Headlines = db.headlines;

const openai = new OpenAI({ Authorization: process.env.OPENAI_API_KEY });

const TIME_DIFF_REQ = Number(process.env.TIME_DIFF);
var lastExecuteAt = new Date().getTime();

const postData = async (req, res) => {
  console.log("---> POST Request received");

  const headline = req?.body?.headline;
  const article = req?.body?.article;
  const link = req?.body?.link;

  if (!headline || !article || !link) {
    res.status(400).send("Please include headline, link and article in body");
  }

  try {
    const data = await Headlines.findOne({
      where: {
        link: link,
      },
    });

    if (data) {
      // send the data to client
      res.status(200).send(data);
    } else {
      // get the data from OpenAI. save it in the database and send response

      const curTime = new Date().getTime();
      const timeDiff = lastExecuteAt + TIME_DIFF_REQ - curTime;
      const steTimeoutFor = timeDiff > 0 ? timeDiff : 0;
      lastExecuteAt = curTime + steTimeoutFor;

      console.log(`---> Will process this request in ${steTimeoutFor}`);

      setTimeout(async () => {
        const rhymeQuestion =
          "Generate a mini-rhyme from the following news headline: " + headline;
        const biasQuestion =
          "Generate a brief summary of the bias, if any, in the following news article: " +
          article;

        console.log("---> Sending requests to OpenAI");

        const respRhyme = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: rhymeQuestion }],
        });

        const respBias = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: biasQuestion }],
        });

        console.log("---> Response received from OpenAI");

        const rhyme = respRhyme.choices[0].message.content;
        const bias = respBias.choices[0].message.content;

        const dataToSave = {
          headline: headline,
          rhyme: rhyme,
          bias: bias,
          link: link,
        };

        res.status(200).send(dataToSave);

        await Headlines.create(dataToSave);
      }, steTimeoutFor);
    }
  } catch (error) {
    await Headlines.destroy({
      where: {
        headline: headline,
      },
    });
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = postData;
