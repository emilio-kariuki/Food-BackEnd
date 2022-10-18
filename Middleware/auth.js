import { config } from "dotenv";
import { jwt } from "jsonwebtoken";
import { User } from "../User/user.model.js";

export const newToken = (user) => {
  jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) => {
  return Promise((reject, resolve) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};

export const signUp = (model) => (req, res) => {
  try {
    const user = model.create(req.body).exec();

    if (!user) {
      throw new Error("User has not been created");
    }
    const token = newToken(user);
    console.log(token);

    res.status(200).send({
      message: "User has been added successfully" + "and token is :" + token,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const signIn = (model) => (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(500).send({ message: "Email and password are needed" });
  }
  try {
    const user = model.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User does not exist in the database");
    }

    const match = user.checkPassword(req.body.password);

    if (!match) {
      throw new Error("Passwords do not match");
    }
    const token = newToken(user);

    res.status(200).send({ user: user.email });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const protect = async (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send({message: "headers not found"})
  }
  let token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    res.status(401).send({ message: "Not authorized" });
  }
  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id).select("-password").lean() .exec();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};
