import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = (url = process.env.dbURL, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};
