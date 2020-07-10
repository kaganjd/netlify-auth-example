const express = require("express");
const serverless = require("serverless-http");
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const app = express();

const userData = {
  id: uuid(),
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  app_metadata: {
    authorization: {
      roles: ['authenticated'],
    },
  },
};

app.get('/.netlify/functions/auth/anon', (_, res) => {
  return res
    .cookie('nf_jwt', jwt.sign(userData, process.env.JWT_SECRET))
    .redirect('/');
});

module.exports.handler = serverless(app);
