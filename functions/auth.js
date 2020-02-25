import express from 'express';
import serverless from 'serverless-http';
import { sign } from 'jsonwebtoken';
import uuid from 'uuid/v4';

const app = express();

const userData = {
  id: uuid(),
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  app_metadata: {
    authorization: {
      roles: ['admin'],
    },
  },
};

app.get('/.netlify/functions/auth/anon', (_, res) => {
  return res
    .cookie('nf_jwt', sign(userData, process.env.JWT_SECRET))
    .redirect('/');
});

export const handler = serverless(app);
