require("dotenv").config({path: "./.env"});

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
};
