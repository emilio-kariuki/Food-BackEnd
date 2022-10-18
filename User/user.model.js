import { mongoose } from 'mongoose';
import uuid from 'node-uuid';
import bcrypt from 'bcrypt';

//components of the user Schema
/*
1. first name
2. second name
3. email
4. password
5. location
6. country
7. latitude
8. longitude
9. number of orders
10. balance


*/

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "empty",
  },
  secondName: {
    type: String,
    default: "empty",
  },
  _id: {
    type: String,
    default: uuid.v1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Nyeri",
  },
  country: {
    type: String,
    default: "Kenya",
  },
  longitude: {
    type: Number,
    default: 157423383245,
  },
  latitude: {
    type: Number,
    default: 5466238298,
  },
  orders: {
    type: Number,
    default: 0,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }


    this.password = hash;
    next();
  });
});


userSchema.methods.checkPassword = function(password){
  const passwordHash = this.password;
  return new Promise((reject, resolve) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        reject(err);
      }
      resolve(same);
    });
  });
};

export const User = new mongoose.model("users", userSchema);
