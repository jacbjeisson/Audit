require('dotenv').config()

export const constants = {
  secret: process.env.JWT_SECRET_KEY,
  secretForToken: process.env.TOKEN_SECRET_KEY
};
