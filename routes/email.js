const express = require("express");
const router = express.Router();
const sendEmail = require("../services/email");

const apiKeyMiddleware = async (req, res, next) => {
  const reqAPIKey = req.header("X-API-KEY");
  const emailAPIKey = process.env.API_EMAIL_KEY;

  if (reqAPIKey === emailAPIKey) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.post("/", [
  apiKeyMiddleware,
  async function (req, res, next) {
    const emailInfo = await sendEmail(req.body);

    res.send(emailInfo);
  },
]);

module.exports = router;
