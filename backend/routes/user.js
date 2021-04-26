const router = require("express").Router();
let User = require("../models/user-model");

router.route("/:id").get((req, res) => {
  User.findOne({ email: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const first = req.body.first;
  const last = req.body.last;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const email = req.body.email;
  const secret = req.body.secret;

  const newUser = new User({
    first,
    last,
    gender,
    dob,
    email,
    secret,
  });

  newUser.save()
    .then(() => res.json("New User Added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.first = req.body.first;
      user.last = req.body.last;
      user.gender = req.body.gender;
      user.dob = req.body.dob;
      user.secret = req.body.secret;

      user.save()
        .then(() => res.json("User Updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findOneAndDelete({ email: req.params.id })
    .then((user) => res.json("User Deleted Successfully."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
