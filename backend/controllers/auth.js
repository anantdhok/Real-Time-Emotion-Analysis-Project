const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createJWT } = require("../utils/auth");
const User = require("../models/user-model");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
  let errors = [];
  let { first, last, gender, dob, email, password } = req.body;

  if (!first) errors.push({ first: "Firstname is required" });
  if (!last) errors.push({ last: "Lastname is required" });
  if (!gender) errors.push({ gender: "Gender is required" });
  if (!dob) errors.push({ dob: "Date of Birth is required" });
  if (!email) errors.push({ email: "Email is required" });
  else if (!emailRegex.test(email)) errors.push({ email: "Email is invalid" });
  if (!password) errors.push({ secret: "Password is required" });
  if (errors.length > 0) return res.status(422).json({ errors: errors });

  User.findOne({ email: email })
    .then((user) => {
      if (user) return res.status(422).json({ errors: [{ user: "Account with this email already exists" }] });
      else {
        const newUser = new User({
          first: first,
          last: last,
          gender: gender,
          dob: dob,
          email: email,
          secret: password,
        });

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            newUser.secret = hash;
            newUser
              .save()
              .then((response) =>
                res.status(200).json({
                  success: true,
                  result: response,
                })
              )
              .catch((err) =>
                res.status(500).json({
                  errors: [{ error: err }],
                })
              );
          });
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        erros: [{ error: "Something went wrong, please try again" }],
      })
    );
};

exports.signin = (req, res) => {
  let errors = [];
  let { email, password } = req.body;

  if (!email) errors.push({ email: "Email is required" });
  else if (!emailRegex.test(email)) errors.push({ email: "Email is invalid" });
  if (!password) errors.push({ password: "Password is required" });
  if (errors.length > 0) return res.status(422).json({ errors: errors });

  User.findOne({ email: email })
    .then((user) => {
      if (!user)
        return res.status(404).json({
          errors: [{ user: "Account with this email does not exists" }],
        });
      else
        bcrypt.compare(password, user.secret)
          .then((isMatch) => {
            if (!isMatch) return res.status(400).json({ errors: [{ password: "Password is incorrect" }] });
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
              if (err) res.status(500).json({ erros: err });
              if (decoded)
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user,
                });
            });
          })
          .catch((err) => res.status(500).json({ erros: err }));
    })
    .catch((err) => res.status(500).json({ erros: err }));
};
