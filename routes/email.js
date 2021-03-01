const express = require("express");
const router = express.Router();

const apiKeyMiddleware = async (req, res, next) => {
  const reqAPIKey = req.header("X-API-KEY");
  const emailAPIKey = process.env.API_EMAIL_KEY;

  if (reqAPIKey === emailAPIKey) {
    //send email
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.post("/", [
  apiKeyMiddleware,
  function (req, res, next) {
    res.render("index", { title: "email api" });
  },
]);

module.exports = router;
