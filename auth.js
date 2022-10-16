export const signUp = (model) => (req, res) => {
  try {
    const user = model.create(req.body).exec();

    if (!user) {
      throw new Error("User has not been created");
    }

    res.status(200).send({ message: "User has been added successfully" });
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

    // const match = user.checkPassword(req.body.password);

    // if (!match) {
    //   throw new Error("Passwords do not match");
    // }

    res.status(200).send({ user: user.email });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const userController = (model) => ({
  signIn: signIn(model),
  signUp: signUp(model),
});
