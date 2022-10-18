import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { User } from '../User/user.model.js';
import bcrypt from "bcrypt";

const jwtKey = "my_secret_key";

export const verifyToken = (token) => {
  return Promise((reject, resolve) => {
    jwt.verify(token, jwtKey, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

export const signUp = async (req, res, next) => {
  try {
    const user = User.create(req.body);

    if (!user) {
      throw new Error("User has not been created");
    }

    const token = jwt.sign({ id: user.id }, jwtKey, {
      expiresIn: "2h",
    });

    user.token = token;
    console.log("The token for the user is : " + token);

    res.status(200).send({
      message: "User has been added successfully" + "and token is :" + token,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const signIn = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(500).send({ message: "Email and password are needed" });
  }


  try {
    const user = User.findOne({ email: req.body.email }).select('email password').exec()
    if (!user) {
      throw new Error("User does not exist in the database");
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      throw new Error("Passwords do not match");
    }

    const token = jwt.sign({ id: user.id }, jwtKey, {
      expiresIn: "2h",
    });

    user.token = token;

    res.status(200).send({ user: user.email });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "headers not found" });
  }
  let token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    res.status(401).send({ message: "Not authorized" });
  }
  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id)
      .select("-password")
      .lean()
      .exec();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};
